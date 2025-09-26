import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './auth-tokens';

// Allow overriding the GraphQL endpoint via env; fall back to common defaults
const GRAPHQL_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_URL?.trim() ||
  'https://connectu-platform-backend-api.onrender.com/';

if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  // Surface a hint in the console so misconfigured endpoints are obvious during dev
  // eslint-disable-next-line no-console
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

const httpLink = new HttpLink({ uri: GRAPHQL_URI, credentials: 'include' });

// Attach JWT token
const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
  }));
  return forward(operation);
});

// Refresh logic
const refreshLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let sub: any;
    let retried = false;

    const processNext = () => {
      sub = forward(operation).subscribe({
        next: (result) => observer.next(result),
        error: async (networkOrGraphQLError) => {
          const status =
            (networkOrGraphQLError as any)?.statusCode ||
            (networkOrGraphQLError as any)?.networkError?.status ||
            (networkOrGraphQLError as any)?.response?.status;

          const shouldTryRefresh = (status === 401 || status === 403) && !retried;
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

            const refreshed: any = data || {};
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
            clearTokens();
            if (typeof window !== 'undefined') window.location.href = '/login';
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

const errorLink = onError((error: any) => {
  const { graphQLErrors, networkError, operation } = error as any;
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
