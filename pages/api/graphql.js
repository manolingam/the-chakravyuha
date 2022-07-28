import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { verify } from 'jsonwebtoken';

import typeDefs from '../../schema/typedefs';
import resolvers from '../../schema/resolvers';

import connectMongo from '../../utils/mongoose';
import { CONFIG } from '../../config';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    try {
      verify(token, CONFIG.JWT_SECRET);
      return;
    } catch (e) {
      throw Error('Unauthorized');
    }
  },
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
