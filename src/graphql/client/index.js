import { ApolloClient,  InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getItem } from '../../utils/localStore';

const httpLink = createHttpLink({
    uri: 'https://34c5-2401-4900-1c20-2a40-c0f3-fce4-2a71-65b0.ngrok-free.app/graphql',
  });

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getItem("auth_token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});