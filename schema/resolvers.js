import Application from '../models/application';
import Consultation from '../models/consultation';
import Raid from '../models/raid';
import RaidParty from '../models/raidparty';
import Member from '../models/member';

const resolvers = {
  Query: {
    async consultations(parent, { filter, skip }) {
      let response;
      switch (filter) {
        case 'cancelled':
          response = await Consultation.find({
            consultation_hash: 'cancelled'
          }).skip(skip);

          break;
        case 'completed':
          response = await Consultation.find({
            consultation_hash: { $ne: null }
          }).skip(skip);

          break;
        default:
          response = await Consultation.find({
            consultation_hash: { $not: { $ne: null } }
          }).skip(skip);
      }
      return response;
    },

    async applications(parent, { skip }) {
      const response = await Application.find()
        .populate('referred_by')
        .skip(skip);
      return response;
    },

    async members(parent, { skip }) {
      const response = await Member.find()
        .populate('championed_by')
        .populate('application')
        .skip(skip);
      return response;
    },

    async raids(parent, { filter, skip }) {
      let response;
      switch (filter) {
        case 'awaiting':
          response = await Raid.find({ status: 'Awaiting' })
            .populate('cleric')
            .populate('consultation')
            .populate('raid_party')
            .populate('related_raids')
            .skip(skip);

          break;
        case 'preparing':
          response = await Raid.find({ status: 'Preparing' })
            .populate('cleric')
            .populate('consultation')
            .populate('raid_party')
            .populate('related_raids')
            .skip(skip);

          break;
        case 'raiding':
          response = await Raid.find({ status: 'Raiding' })
            .populate('cleric')
            .populate('consultation')
            .populate('raid_party')
            .populate('related_raids')
            .skip(skip);

          break;
        case 'shipped':
          response = await Raid.find({ status: 'Shipped' })
            .populate('cleric')
            .populate('consultation')
            .populate('raid_party')
            .populate('related_raids')
            .skip(skip);

          break;
      }
      return response;
    },

    async raidparties(parent, { skip }) {
      const response = await RaidParty.find()
        .populate('members')
        .populate('raid')
        .skip(skip);
      return response;
    },

    // individual record resolvers
    async raid(parent, { _id }) {
      const response = await Raid.findById(_id)
        .populate('cleric')
        .populate('raid_party')
        .populate('consultation')
        .populate('related_raids');
      return response;
    },
    async member(parent, { filters }) {
      const shouldApplyIdFilter = !!filters._id;
      const shouldApplyEthFilter = !!filters.eth_address;

      let response;

      if (shouldApplyIdFilter) {
        response = await Member.findById(filters._id)
          .populate('championed_by')
          .populate('application');
      } else if (shouldApplyEthFilter) {
        response = await Member.findOne({
          eth_address: { $regex: filters.eth_address, $options: 'i' }
        })
          .populate('championed_by')
          .populate('application');
      }
      return response;
    },
    async consultation(parent, { _id }) {
      const response = await Consultation.findById(_id).populate('raid');
      return response;
    },
    async application(parent, { _id }) {
      const response = await Application.findById(_id).populate('referred_by');
      return response;
    },
    async raidparty(parent, { _id }) {
      const response = await RaidParty.findById(_id)
        .populate('members')
        .populate('raid');
      return response;
    }
  },

  // Custom resolvers
  Consultation: {
    raid: async (_consultation) => {
      const _raid = await Raid.findOne({
        consultation: _consultation._id
      });
      return _raid;
    }
  },
  Raid: {
    raid_party: async (_raid) => {
      const _party = await RaidParty.findOne({ raid: _raid._id });
      return _party;
    },
    cleric: async (_raid) => {
      const _cleric = await Member.findOne({ _id: _raid.cleric });
      return _cleric;
    }
  },
  RaidParty: {
    members: async (_raidparty) => {
      const _members = [];
      for await (const _memberId of _raidparty.members) {
        const _member = await Member.findOne({ _id: _memberId });
        _members.push(_member);
      }
      return _members;
    }
  }
};

export default resolvers;
