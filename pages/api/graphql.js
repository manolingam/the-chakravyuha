import { ApolloServer } from 'apollo-server-micro';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { verify } from 'jsonwebtoken';
import { utils } from 'ethers';

import typeDefs from '../../schema/typedefs';
import resolvers from '../../schema/resolvers';

import connectMongo from '../../utils/mongoose';
import {
  SIGNATURE_MESSAGE,
  WHITELISTED_ADDRESSES
} from '../../utils/constants';
import { CONFIG } from '../../config';
import { validateMembership } from '../../utils/web3';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
  context: async ({ req }) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    try {
      let { signature } = verify(token, CONFIG.JWT_SECRET);
      const account = utils.verifyMessage(SIGNATURE_MESSAGE, signature);

      let isMember = await validateMembership(account);
      let isWhitelisted = account.toLowerCase() in WHITELISTED_ADDRESSES;

      if (isMember || isWhitelisted) {
        return;
      } else {
        throw new Error('You are not a member of the raid guild');
      }
    } catch (e) {
      throw Error('Unauthorized');
    }
  }
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
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
