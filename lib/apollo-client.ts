import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAccessToken, getRefreshToken, saveTokens } from './auth-tokens';

// Allow overriding the GraphQL endpoint via env; fall back to common defaults
const GRAPHQL_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_URL?.trim() ||
  'https://connectu-platform-backend-api.onrender.com/';

if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  // Surface a hint in the console so misconfigured endpoints are obvious during dev
  console.warn('[Apollo] Using default GRAPHQL_URI (deployed):', GRAPHQL_URI, '(set NEXT_PUBLIC_GRAPHQL_URL to override)');
}

// Refresh mutation aligned with backend schema that returns a new access token as `token`
const REFRESH_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      payload
    }
  }
`;

// Cross-origin requests to Render should not include cookies by default to avoid CSRF 403s
const httpLink = new HttpLink({ uri: GRAPHQL_URI, credentials: 'omit' });

// Attach JWT token
const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
  }));
  if (typeof window !== 'undefined') {
    const present = !!token;
    const tail = token ? token.slice(-8) : '';
    console.debug('[Apollo] auth header set:', present ? `JWT ...${tail}` : 'none');
  }
  return forward(operation);
});

// Refresh logic
const refreshLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let sub: { unsubscribe: () => void } | null = null;
    let retried = false;

    const processNext = () => {
      sub = forward(operation).subscribe({
        next: (result) => observer.next(result),
        error: async (networkOrGraphQLError: Error & {
          statusCode?: number;
          networkError?: { status?: number };
          response?: { status?: number };
        }) => {
          const status =
            networkOrGraphQLError.statusCode ||
            networkOrGraphQLError.networkError?.status ||
            networkOrGraphQLError.response?.status;

          if (typeof window !== 'undefined') {
            // eslint-disable-next-line no-console
            console.warn('[Apollo] network error status:', status);
          }

          // Only attempt refresh when explicitly unauthorized; avoid treating 403 (e.g., CSRF) as token expiry
          const shouldTryRefresh = status === 401 && !retried;
          if (!shouldTryRefresh) {
            observer.error(networkOrGraphQLError);
            return;
          }

          retried = true;
          try {
            const rt = getRefreshToken();
            if (!rt) throw new Error('No refresh token');

            // Run refresh mutation with a temporary Apollo client
            const refreshClient = new ApolloClient({
              link: httpLink,
              cache: new InMemoryCache(),
            });

            const { data } = await refreshClient.mutate({
              mutation: REFRESH_MUTATION,
              variables: { refreshToken: rt },
            });

            interface RefreshTokenResponse {
              refreshToken?: {
                token: string;
                payload: unknown;
              };
            }
            const refreshed = (data || {}) as RefreshTokenResponse;
            const newAccess = refreshed?.refreshToken?.token;
            const newRefresh = undefined; // backend doesn't return a new refresh token; keep existing

            if (!newAccess) throw new Error('No access token in refresh response');

            // Save new tokens
            saveTokens(newAccess, newRefresh);

            // Retry original operation with new token
            operation.setContext(({ headers = {} }) => ({
              headers: { ...headers, Authorization: `JWT ${newAccess}` },
            }));
            processNext();
          } catch (e) {
            // Do NOT auto-clear tokens or redirect here; it causes snap-back loops.
            // Surface the error and let the UI decide how to handle auth failures.
            if (typeof window !== 'undefined') {
              // eslint-disable-next-line no-console
              console.error('[Apollo] refresh token failed:', e);
            }
            observer.error(networkOrGraphQLError);
          }
        },
        complete: () => observer.complete(),
      });
    };

    processNext();

    return () => {
      if (sub) sub.unsubscribe();
    };
  });
});

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, unknown>;
}

interface ErrorResponse {
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
    response?: Response;
    result?: Record<string, unknown>;
  };
  operation?: {
    operationName?: string;
  };
}

const errorLink = onError((error: ErrorResponse) => {
  const { graphQLErrors, networkError, operation } = error;
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(`[GraphQL error] in ${operation?.operationName || 'anonymous'}:`, err);
    }
  }
  if (networkError) {
    console.error('[Network error]:', networkError);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
