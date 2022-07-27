import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Consultation {
    _id: ID!
    contact_name: String!
    contact_email: String!
    contact_bio: String!
    contact_discord: String
    contact_telegram: String
    contact_twitter: String
    contact_github: String
    project_name: String!
    project_link: String
    project_type: String!
    project_specs: String!
    project_desc: String!
    services_req: [String!]!
    desired_delivery: String
    budget: String!
    delivery_priorities: String!
    additional_info: String!
    submission_type: String!
    submission_hash: String
    consultation_hash: String
    raid: Raid
    createdAt: String!
    updatedAt: String!
  }

  type Application {
    _id: ID!
    name: String!
    email_address: String!
    discord_handle: String!
    telegram_handle: String
    github_handle: String
    eth_address: String!
    ens_name: String
    introduction: String!
    learning_goals: String!
    primary_skills: [String!]!
    secondary_skills: [String!]!
    skill_type: String!
    passion: String!
    favorite_media: String!
    crypto_thrills: String!
    why_raidguild: String!
    dao_familiarity: String!
    availability: String!
    crypto_exp: String!
    comments: String!
    handbook_read: Boolean!
    pledge_readiness: Boolean!
    referred_by: Member
    createdAt: String!
    updatedAt: String!
  }

  type Member {
    _id: ID!
    legacy_id: String
    name: String
    email_address: String!
    discord_handle: String!
    telegram_handle: String
    github_handle: String
    eth_address: String!
    ens_name: String
    guild_class: String!
    primary_skills: [String!]!
    secondary_skills: [String!]!
    membership_date: String!
    is_raiding: Boolean!
    championed_by: Member
    application: Application
    createdAt: String!
    updatedAt: String!
  }

  type Raid {
    _id: ID!
    raid_name: String!
    status: String!
    category: String!
    cleric: Member
    roles_required: [String!]
    raid_party: RaidParty
    invoice_address: String
    start_date: String
    end_date: String
    consultation: Consultation
    related_raids: [Raid!]
    createdAt: String!
    updatedAt: String!
  }

  type RaidParty {
    _id: ID!
    members: [Member!]!
    raid: Raid!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    consultations(filter: String, skip: Int): [Consultation]
    raids(filter: String, skip: Int): [Raid]
    applications(skip: Int): [Application]
    members(member: String, skip: Int): [Member]
    raidparties(skip: Int): [RaidParty]

    consultation(_id: String): Consultation
    application(_id: String): Application
    member(filters: MemberFilter): Member
    raid(_id: String): Raid
    raidparty(_id: String): RaidParty
  }

  input MemberFilter {
    _id: String
    eth_address: String
  }
`;

export default typeDefs;
