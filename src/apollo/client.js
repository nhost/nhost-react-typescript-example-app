import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
// Setup the network "links"
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import nhost from '../nhost';

const wsurl = `wss://hasura-yi8ci911.nhost.io/v1alpha1/graphql`;
const httpurl = `https://hasura-yi8ci911.nhost.io/v1alpha1/graphql`;

const jwt_token = nhost.getJWTToken();

// create the web socket link
const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
    connectionParams: () => ({
      headers: {
        authorization: jwt_token ? `Bearer ${jwt_token}` : '',
      },
    }),
  },
});

let httpLink = new HttpLink({
  uri: httpurl,
});

const authLink = setContext((a, { headers }) => {
  const jwt_token = nhost.getJWTToken();
  return {
    headers: {
      ...headers,
      authorization: jwt_token ? `Bearer ${jwt_token}` : '',
    },
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
