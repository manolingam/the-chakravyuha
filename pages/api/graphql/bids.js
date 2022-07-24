import axios from 'axios';

const graphqlEndpoint =
  'https://api.thegraph.com/subgraphs/name/slgraham/guildauctionqueues-xdai';

export default async function handler(req, res) {
  const { hash } = req.body;

  const defaultQuery = `query fetchBids {
    bids(where: {queue: "0xd880b00877726c2b76173acec061b29c27d5d791"}) {
        id
        amount
        createdAt
        details
        createTxHash
        status
        submitter {
          id
        }
        increases {
          increasedAt
          amount
          increasedBy
          increaseTxHash
        }
        withdraws {
          withdrawnAt
          amount
          withdrawTxHash
        }
    }
}`;

  const graphqlQuery = {
    operationName: 'fetchBids',
    query: defaultQuery,
    variables: {}
  };

  const { data } = await axios.post(graphqlEndpoint, graphqlQuery);

  res.status(200).json(data.data);
}
