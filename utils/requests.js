import axios from 'axios';

export const getAllConsultations = async (filter, skip) => {
  const consultations = await axios.post('/api/consultations', {
    filter,
    skip
  });
  return consultations.data;
};

export const getConsultation = async (id) => {
  const consultation = await axios.post('/api/consultation', { id });
  return consultation.data;
};

export const getApplication = async (id) => {
  const application = await axios.post('/api/application', { id });
  return application.data;
};

export const getAllRaids = async (filter, skip) => {
  const raids = await axios.post('/api/raids', { filter, skip });
  return raids.data;
};

export const getAllMembers = async (skip) => {
  const members = await axios.post('/api/members', { skip });
  return members.data;
};

export const getMemberByAddress = async (signerAddress) => {
  const member = await axios.post('/api/member', { signerAddress });
  return member.data;
};

export const getAllBids = async () => {
  const graphqlEndpoint =
    'https://api.thegraph.com/subgraphs/name/slgraham/guildauctionqueues-xdai';

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

  return data.data.bids;
};

export const getQueuedBids = async (hash) => {
  const { data } = await axios.post('/api/graphql/bid', { hash });
  return data;
};
