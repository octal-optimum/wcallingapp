const mongoose = require('mongoose');

const teamLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { type: String, required: true },
  username: { type: String, required: true },
  assignedCalls: [
    {
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
      calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
    },
  ],
  assignedManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }],
});

module.exports = mongoose.model('TeamLead', teamLeadSchema);
