import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import typeDefs from '../../schema/typedefs';
import resolvers from '../../schema/resolvers';

import connectMongo from '../../utils/mongoose';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await connectMongo();
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};
