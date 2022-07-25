import axios from 'axios';

const graphqlEndpoint =
  'https://api.thegraph.com/subgraphs/name/slgraham/guildauctionqueues-xdai';

export default async function handler(req, res) {
  const { hash } = req.body;

  const defaultQuery = `query fetchQueuedBids {
    bids(where: {details: "${hash}"}) {
      status
    }
}`;

  const graphqlQuery = {
    operationName: 'fetchQueuedBids',
    query: defaultQuery,
    variables: {}
  };

  const { data } = await axios.post(graphqlEndpoint, graphqlQuery);

  res.status(200).json(data.data);
}
