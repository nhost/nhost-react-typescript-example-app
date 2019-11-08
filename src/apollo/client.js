import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { auth } from '../nhost';

import { HASURA_GQE_ENDPOINT_WS, HASURA_GQE_ENDPOINT_HTTP } from '../config';

export const generateApolloProviderClient = (param_headers = {}) => {

  const wsurl = HASURA_GQE_ENDPOINT_WS;
  const httpurl = HASURA_GQE_ENDPOINT_HTTP;

  // create the web socket link
  const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
      reconnect: true,
      connectionParams: () => {
        const jwt_token = auth.getJWTToken();
        return {
          headers: {
            authorization: jwt_token ? `Bearer ${jwt_token}` : '',
            ...param_headers,
          },
        };
      },
    },
  });

  let httpLink = new HttpLink({
    uri: httpurl,
  });

  const authLink = setContext((a, { headers }) => {
    const jwt_token = auth.getJWTToken();
    return {
      headers: {
        ...headers,
        authorization: jwt_token ? `Bearer ${jwt_token}` : '',
        ...param_headers,
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

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });
};
