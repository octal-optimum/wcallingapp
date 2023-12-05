// controllers/ownerController.js
const Call = require('../models/Calls');// You need to create TeamLead model
const axios = require('axios');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');


// controllers/ownerController.js
const Manager = require('../models/ManagerModel');
const TeamLead = require('../models/TeamLeadModal');
const Supervisor = require('../models/SuperVisorModel');
const Agent = require('../models/Agent');
const User = require("../models/User")

exports.createRole = async (req, res) => {
  try {
    // Assuming you send the role type and username in the request body
    const { roleType, username, password ,name} = req.body;


    // Create a new user
    const user = new User({ username, password ,name,roleType});
    await user.save();

    // Validate role type
    if (!['manager', 'teamLead', 'supervisor', 'agent'].includes(roleType)) {
      return res.status(400).json({ error: 'Invalid role type' });
    }

    // Validate username and password
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Create role based on the specified type
    let newRole;

    switch (roleType) {
      case 'manager':
        newRole = new Manager({ name:name,username: username, password:password,roleType:roleType });
        break;
      case 'teamLead':
        newRole = new TeamLead({ name:name,username: username, password:password,roleType:roleType });
        break;
      case 'supervisor':
        newRole = new Supervisor({ name:name,username: username, password:password,roleType:roleType });
        break;
      case 'agent':
        newRole = new Agent({ name:name,username: username, password:password,roleType:roleType });
        break;
      default:
        return res.status(400).json({ error: 'Invalid role type' });
    }

    // Save the new role
    await newRole.save();

  
    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.distributeCalls = async (req, res) => {
  try {
    const { numberOfCalls } = req.body;

    // Fetch all team leads
    const teamLeads = await TeamLead.find();

    // Distribute calls equally
    const calls = await Call.find().limit(numberOfCalls);
    const callsPerTeamLead = Math.floor(numberOfCalls / teamLeads.length);

    for (let i = 0; i < teamLeads.length; i++) {
      const teamLead = teamLeads[i];
      const assignedCalls = calls.slice(i * callsPerTeamLead, (i + 1) * callsPerTeamLead);

      // Update the team lead document with assigned calls
      await TeamLead.findByIdAndUpdate(teamLead._id, { $set: { assignedCalls } });
    }

    res.json({ message: 'Calls distributed successfully to teamleads' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.callsDataUpload = async (req, res) => {
  try {
    const calls = [];

    // Assuming you are using csv-parser
    const fileBuffer = req.file.buffer; // Access the buffer directly

    // Convert the buffer to a string (assuming it's a CSV file)
    const fileString = fileBuffer.toString('utf-8');

    // Use a readable stream from the string
    const readableStream = Readable.from([fileString]);

    readableStream
      .pipe(csv())
      .on('data', (row) => {
        // Assuming your CSV has 'name' and 'phoneNumber' columns
        const { name, phoneNumber } = row;
        calls.push({ name, phoneNumber });
      })
      .on('end', async () => {
        // Save calls to MongoDB
        await Call.insertMany(calls);

        res.status(200).json({ message: 'Call data uploaded successfully' });
      });
  } catch (error) {
    console.log('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
