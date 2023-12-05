// models/Call.js
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: false },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isCalled: { type: Boolean, default: false },
  callStatus: { type: String, enum: ['interested', 'notInterested', 'notAnswered', 'wrongNumber'], default: null },
  // Add other fields as needed
});

module.exports = mongoose.model('Call', callSchema);
