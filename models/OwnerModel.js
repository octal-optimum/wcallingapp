const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { type: String, required: true },
  username: { type: String, required: true },
  assignedCalls: [
    {
      teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamLead' },
      calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
    },
  ],
  assignedTeamLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamLeads' }],
});

module.exports = mongoose.model('Owner', ownerSchema);
