import axios from 'axios';

import {
  CONSULTATIONS_QUERY,
  CONSULTATION_QUERY,
  RAIDS_QUERY,
  RAID_QUERY,
  MEMBERS_QUERY,
  MEMBER_BY_ADDRESS_QUERY,
  MEMBER_BY_ID_QUERY,
  RAIDPARTY_QUERY,
  APPLICATION_QUERY,
  INVOICE_QUERY
} from '../graphql/queries';

import {
  DATABASE_APOLLO_CLIENT,
  ESCROW_APOLLO_CLIENT
} from '../graphql/client';

export const getConsultations = async (filter, skip) => {
  try {
    const {
      data: { consultations }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: CONSULTATIONS_QUERY,
      variables: { filter: filter, skip: skip }
    });
    return consultations;
  } catch (e) {
    console.log(e);
  }
};

export const getConsultation = async (id) => {
  try {
    const {
      data: { consultation }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: CONSULTATION_QUERY,
      variables: { id: `${id}` }
    });
    return consultation;
  } catch (e) {
    console.log(e);
  }
};

export const getRaids = async (filter, skip) => {
  try {
    const {
      data: { raids }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: RAIDS_QUERY,
      variables: { filter: filter, skip: skip }
    });
    return raids;
  } catch (e) {
    console.log(e);
  }
};

export const getRaid = async (id) => {
  try {
    const {
      data: { raid }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: RAID_QUERY,
      variables: { id: `${id}` }
    });
    return raid;
  } catch (e) {
    console.log(e);
  }
};

export const getMembers = async (skip) => {
  try {
    const {
      data: { members }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: MEMBERS_QUERY,
      variables: { skip: `${skip}` }
    });
    return members;
  } catch (e) {
    console.log(e);
  }
};

export const getChampions = async (member) => {
  try {
    const {
      data: { members }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: MEMBERS_QUERY,
      variables: { member: `${member}` }
    });
    return members;
  } catch (e) {
    console.log(e);
  }
};

export const getMemberById = async (id) => {
  try {
    const {
      data: { member }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: MEMBER_BY_ID_QUERY,
      variables: { id: `${id}` }
    });
    return member;
  } catch (e) {
    console.log(e);
  }
};

export const getMemberByAddress = async (eth_address) => {
  try {
    const {
      data: { member }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: MEMBER_BY_ADDRESS_QUERY,
      variables: { eth_address: `${eth_address}` }
    });
    return member;
  } catch (e) {
    console.log(e);
  }
};

export const getApplication = async (id) => {
  try {
    const {
      data: { application }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: APPLICATION_QUERY,
      variables: { id: `${id}` }
    });
    return application;
  } catch (e) {
    console.log(e);
  }
};

export const getRaidParty = async (id) => {
  try {
    const {
      data: { raidparty }
    } = await DATABASE_APOLLO_CLIENT.query({
      query: RAIDPARTY_QUERY,
      variables: { id: `${id}` }
    });
    return raidparty;
  } catch (e) {
    console.log(e);
  }
};

export const getInvoice = async (address) => {
  try {
    const {
      data: { invoice }
    } = await ESCROW_APOLLO_CLIENT.query({
      query: INVOICE_QUERY,
      variables: { address: `${address.toLowerCase()}` }
    });
    return invoice;
  } catch (e) {
    console.log(e);
  }
};

export const getQueuedBids = async (hash) => {
  const { data } = await axios.post('/api/graphql/bid', { hash });
  return data;
};
