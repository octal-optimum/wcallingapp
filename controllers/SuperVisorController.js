const Call = require('../models/Calls');
const Agent = require("../models/Agent")
const Supervisor = require('../models/SuperVisorModel')

exports.distributeCalls = async (req, res) => {
  try {
    const { SupervisorId } = req.body;

    // Fetch the spervisor
    const supervisor = await Supervisor.findById(SupervisorId).populate('assignedAgents');

    // Collect all calls assigned to the  supervisor
    let allAssignedCalls = [];
    supervisor.assignedCalls.forEach((assignedCall) => {
      allAssignedCalls = allAssignedCalls.concat(assignedCall.calls);
    });

    // Distribute calls equally among agents
    const agents = supervisor.assignedAgents;
    const callsPerAgent = Math.floor(allAssignedCalls.length / agents.length);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const assignedCalls = allAssignedCalls.slice(i * callsPerAgent, (i + 1) * callsPerAgent);

      // Update the agent document with assigned calls
      await Agent.findByIdAndUpdate(agent._id, { $set: { assignedCalls } });
    }

    res.json({ message: 'Calls assigned successfully to agents' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};