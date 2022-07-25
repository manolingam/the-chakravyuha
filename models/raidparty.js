const { Schema, model, models } = require('mongoose');

const raidPartySchema = new Schema(
  {
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'Member',
      required: true
    },
    raid: {
      type: Schema.Types.ObjectId,
      ref: 'Raid',
      required: true
    }
  },
  { timestamps: true }
);

const RaidParty = models.RaidParty || model('RaidParty', raidPartySchema);

export default RaidParty;
