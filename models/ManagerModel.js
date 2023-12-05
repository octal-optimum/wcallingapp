const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { type: String, required: true },
  username: { type: String, required: true },
  assignedCalls: [
    {
      TeamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamLead' },
      calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
    },
  ],
  assignedSuperVisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' }],
});

module.exports = mongoose.model('Manager', ManagerSchema);
