const mongoose = require('mongoose');

const superVisorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { type: String, required: true },
  username: { type: String, required: true },
  assignedCalls: [
    {
      Manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
      calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
    },
  ],
  assignedAgents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agents' }],
});

module.exports = mongoose.model('Supervisor', superVisorSchema);
