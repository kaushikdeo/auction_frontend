import { ApolloClient,  InMemoryCache, createHttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getItem } from '../../utils/localStore';

const httpLink = createHttpLink({
    // uri: 'https://auctions-backend.onrender.com/graphql',
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new GraphQLWsLink(createClient({
    // url: 'wss://auctions-backend.onrender.com/graphql',
    url: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
    },
  }));

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

  const splitLink = split(
    ({ query }) => {
      const {kind, operation} = getMainDefinition(query);
      console.log("-----------------------------------", query, kind, operation )
      return (kind === 'OperationDefinition' && operation === 'subscription');
    },
    wsLink,
    authLink.concat(httpLink),
  );

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});