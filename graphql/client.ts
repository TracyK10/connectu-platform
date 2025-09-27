// import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'; // <-- uncomment when ready

// TODO: Set your existing backend GraphQL endpoint here (client-side)
// const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://your-backend.example.com/graphql';

// TODO: If your backend uses a token/cookie, attach it here
// const authLink = new ApolloLink((operation, forward) => {
// 	const token = typeof window !== 'undefined' ? window.localStorage.getItem('connectu_auth_token') : null;
// 	if (token) {
// 		operation.setContext(({ headers = {} }) => ({ headers: { ...headers, Authorization: `Bearer ${token}` } }));
// 	}
// 	return forward(operation);
// });

// const httpLink = new HttpLink({ uri: GRAPHQL_URL, credentials: 'include' });

// export const apolloClient = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });
