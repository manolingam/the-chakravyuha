import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { sign } from 'jsonwebtoken';

const TEMP_TOKEN = (signature) =>
  sign({ signature }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: '1h'
  });

export const DATABASE_APOLLO_CLIENT = (signature) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
      headers: {
        authorization: `Bearer ${TEMP_TOKEN(signature)}`
      }
    }),
    cache: new InMemoryCache()
  });
};

export const ESCROW_APOLLO_CLIENT = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/dan13ram/xdai-smart-invoices',
  cache: new InMemoryCache()
});
