// models/FeedbackForm.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackFormSchema = new Schema({
  agent: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
  clientPhoneNumber: { type: String, required: true },
  callStatus: { type: String, enum: ['interested', 'not interested', 'not answered', 'wrong number'], required: true },
  comments: { type: String },
  // Add other fields as needed
});

module.exports = mongoose.model('FeedbackForm', feedbackFormSchema);
