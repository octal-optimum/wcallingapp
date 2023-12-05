// controllers/agentController.js
const Agent = require('../models/Agent');
const Supervisor = require('../models/SuperVisorModel');
const Call = require('../models/Calls');
const FeedbackForm = require('../models/feedBackForm');

exports.receiveCall = async (req, res) => {
  try {
    const { agentId } = req.body;

    // Fetch the spervisor
    const agent = await Agent.findById(agentId).populate('assignedCalls');

    // Collect all calls assigned to the  supervisor
    let allAssignedCalls = [];
    agent.assignedCalls.forEach((assignedCall) => {
      allAssignedCalls = allAssignedCalls.concat(assignedCall.calls);
    });
    res.json({ message: 'Calls  fetch successfully', allAssignedCalls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.makeCall = async (req, res) => {
  try {
    const { clientPhoneNumber, callStatus } = req.body;

    // Find the client by phone number
    const call = await Call.findOne({ phoneNumber: clientPhoneNumber });
    if (!call) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Logic to make a call and save it to the Call model
    await Call.findByIdAndUpdate(call._id, { isCalled: true, callStatus });

    res.status(200).json({ message: 'Call made successfully' });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCallStatus = async (req, res) => {
  try {
    const { clientPhoneNumber, newStatus } = req.body;

    // Update the call status
    await Call.findOneAndUpdate(
      { phoneNumber: clientPhoneNumber },
      { callStatus: newStatus }
    );

    res.status(200).json({ message: 'Call status updated successfully' });
  } catch (error) {
    console.error('Error updating call status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { clientPhoneNumber, callStatus, comments } = req.body;

    // Find the client by phone number
    const call = await Call.findOne({ phoneNumber: clientPhoneNumber });
    if (!call) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const feedbackForm = new FeedbackForm({
      agent: req.user._id,
      client: call._id,
      callStatus,
      comments,
    });
    await feedbackForm.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
