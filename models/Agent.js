const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { type: String, required: true },
  username: { type: String, required: true },
  assignedCalls: [
    {
      Supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' },
      calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
    },
  ],
})

module.exports = mongoose.model('Agent', agentSchema);