import { gql } from '@apollo/client';

export const CONSULTATIONS_QUERY = gql`
  query Consultations($filter: String, $skip: Int) {
    consultations(filter: $filter, skip: $skip) {
      _id
      project_name
    }
  }
`;

export const CONSULTATION_QUERY = gql`
  query Consultation($id: String!) {
    consultation(_id: $id) {
      _id
      contact_name
      contact_email
      contact_bio
      contact_discord
      contact_telegram
      project_name
      project_type
      project_desc
      services_req
      budget
      additional_info
      submission_hash
      consultation_hash
      delivery_priorities
      submission_type
      raid {
        _id
        cleric {
          _id
          name
          eth_address
        }
      }
    }
  }
`;

export const RAIDS_QUERY = gql`
  query Raids($filter: String, $skip: Int) {
    raids(filter: $filter, skip: $skip) {
      _id
      raid_name
    }
  }
`;

export const RAID_QUERY = gql`
  query Raid($id: String!) {
    raid(_id: $id) {
      _id
      raid_name
      status
      category
      cleric {
        _id
        name
        eth_address
      }
      roles_required
      raid_party {
        members {
          _id
          name
          eth_address
        }
      }
      invoice_address
      consultation {
        _id
        project_desc
        services_req
      }
    }
  }
`;

export const MEMBERS_QUERY = gql`
  query Members($member: String, $skip: Int) {
    members(member: $member, skip: $skip) {
      _id
      name
    }
  }
`;

export const MEMBER_BY_ID_QUERY = gql`
  query Member($id: String!) {
    member(filters: { _id: $id }) {
      _id
      name
      email_address
      discord_handle
      telegram_handle
      eth_address
      guild_class
      primary_skills
      is_raiding
      championed_by {
        _id
        name
        eth_address
      }
      application {
        _id
        introduction
      }
    }
  }
`;

export const MEMBER_BY_ADDRESS_QUERY = gql`
  query Member($eth_address: String!) {
    member(filters: { eth_address: $eth_address }) {
      _id
      name
      email_address
      discord_handle
      telegram_handle
      eth_address
      guild_class
      primary_skills
      is_raiding
      application {
        _id
        name
        introduction
      }
    }
  }
`;

export const APPLICATION_QUERY = gql`
  query Application($id: String!) {
    application(_id: $id) {
      _id
      name
      introduction
      email_address
      discord_handle
      eth_address
      primary_skills
      skill_type
      referred_by {
        _id
        name
        eth_address
      }
    }
  }
`;

export const RAIDPARTY_QUERY = gql`
  query RaidParty($id: String!) {
    raidparty(_id: $id) {
      _id
      members {
        _id
        name
        guild_class
      }
    }
  }
`;

export const INVOICE_QUERY = gql`
  query GetInvoice($address: ID!) {
    invoice(id: $address) {
      id
      address
      network
      token
      client
      provider
      resolverType
      resolver
      resolutionRate
      isLocked
      amounts
      numMilestones
      currentMilestone
      total
      disputeId
      released
      createdAt
      terminationTime
      projectName
      projectDescription
      projectAgreement
      startDate
      endDate
      deposits(orderBy: timestamp, orderDirection: asc) {
        txHash
        sender
        amount
        timestamp
      }
      releases(orderBy: timestamp, orderDirection: asc) {
        txHash
        milestone
        amount
        timestamp
      }
      disputes(orderBy: timestamp, orderDirection: asc) {
        txHash
        ipfsHash
        sender
        details
        timestamp
      }
      resolutions(orderBy: timestamp, orderDirection: asc) {
        txHash
        ipfsHash
        clientAward
        providerAward
        resolutionFee
        timestamp
      }
    }
  }
`;
