const TeamLead = require('../models/TeamLeadModal');
const Call = require('../models/Calls');
const Manager = require("../models/ManagerModel")

exports.distributeCalls = async (req, res) => {
  try {
    const { teamLeadId } = req.body;

    // Fetch the team lead
    const teamLead = await TeamLead.findById(teamLeadId).populate('assignedManagers');

    // Collect all calls assigned to the team lead
    let allAssignedCalls = [];
    teamLead.assignedCalls.forEach((assignedCall) => {
      allAssignedCalls = allAssignedCalls.concat(assignedCall.calls);
    });

    // Distribute calls equally among managers
    const managers = teamLead.assignedManagers;
    const callsPerManager = Math.floor(allAssignedCalls.length / managers.length);

    for (let i = 0; i < managers.length; i++) {
      const manager = managers[i];
      const assignedCalls = allAssignedCalls.slice(i * callsPerManager, (i + 1) * callsPerManager);

      // Update the manager document with assigned calls
      await Manager.findByIdAndUpdate(manager._id, { $set: { assignedCalls } });
    }

    res.json({ message: 'Calls assigned successfully to managers' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};