import {
  ApolloClient,
  split,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
  from,
} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/link-ws';
import Introspection from './introspection-result.json';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import AsyncStorage from '@react-native-async-storage/async-storage';
const wsLink = new GraphQLWsLink(
  createClient({
    // url: 'wss://sf341.herokuapp.com/graphql',
    url: 'ws://localhost:3333/graphql',
  }),
);

const httpLink = new HttpLink({
  // uri: 'https://sf341.herokuapp.com/graphql',
  uri: 'http://localhost:3333/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = AsyncStorage.getItem('token') || '';
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

  return forward(operation);
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache({...Introspection}),
  link: from([authMiddleware, splitLink]),
});
