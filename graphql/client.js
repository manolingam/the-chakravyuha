import { ApolloClient, InMemoryCache } from '@apollo/client';

export const DATABASE_APOLLO_CLIENT = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

export const ESCROW_APOLLO_CLIENT = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/dan13ram/xdai-smart-invoices',
  cache: new InMemoryCache()
});
