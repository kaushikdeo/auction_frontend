import { ApolloClient,  InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getItem } from '../../utils/localStore';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

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
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
});