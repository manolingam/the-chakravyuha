const { Schema, model, models } = require('mongoose');

import { GUILD_CLASS, RAID_STATUS, RAID_CATEGORY } from '../utils/constants';

const raidSchema = new Schema(
  {
    raid_name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      emum: RAID_STATUS,
      required: true
    },
    category: {
      type: String,
      enum: RAID_CATEGORY,
      required: true
    },
    cleric: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    roles_required: {
      type: [String],
      enum: GUILD_CLASS,
      required: false
    },
    raid_party: {
      type: Schema.Types.ObjectId,
      ref: 'RaidParty',
      required: false
    },
    invoice_address: {
      type: String,
      required: false
    },
    start_date: {
      type: Date,
      required: false
    },
    end_date: {
      type: Date,
      required: false
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      required: false
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation',
      required: false
    },
    related_raids: {
      type: [Schema.Types.ObjectId],
      ref: 'Raid',
      required: false
    },
    portfolio: {
      type: Schema.Types.ObjectId,
      ref: 'Portfolio',
      required: false
    },
    legacy: {
      airtable_id: {
        type: String,
        required: false
      },
      escrow_index: {
        type: Number,
        required: false
      },
      locker_hash: {
        type: String,
        required: false
      }
    }
  },
  { timestamps: true }
);

const Raid = models.Raid || model('Raid', raidSchema);

export default Raid;
