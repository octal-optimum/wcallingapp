const Call = require('../models/Calls');
const Manager = require("../models/ManagerModel")
const Supervisor = require('../models/SuperVisorModel')

exports.distributeCalls = async (req, res) => {
  try {
    const { managerId } = req.body;

    // Fetch the team lead
    const manager = await Manager.findById(managerId).populate('assignedSuperVisors');

    // Collect all calls assigned to the  manager
    let allAssignedCalls = [];
    manager.assignedCalls.forEach((assignedCall) => {
      allAssignedCalls = allAssignedCalls.concat(assignedCall.calls);
    });

    // Distribute calls equally among managers
    const supervisors = manager.assignedSuperVisors;
    const callsPerSupervisor = Math.floor(allAssignedCalls.length / supervisors.length);

    for (let i = 0; i < supervisors.length; i++) {
      const supervisor = supervisor[i];
      const assignedCalls = allAssignedCalls.slice(i * callsPerSupervisor, (i + 1) * callsPerSupervisor);

      // Update the Supervisor document with assigned calls
      await Supervisor.findByIdAndUpdate(Supervisor._id, { $set: { assignedCalls } });
    }

    res.json({ message: 'Calls assigned successfully to supervisor' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};