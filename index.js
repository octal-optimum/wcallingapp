// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://gurubilli:gurubilli@cluster0.dlpod.mongodb.net/callingapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Routes
const ownerRoutes = require('./routes/OwnerRoutes')
const teamLeadRoutes = require('./routes/TeamLeadRoutes');
const managerRoutes = require('./routes/ManagerRoutes');
const supervisorRoutes = require('./routes/SuperVisorRoutes');
const agentRoutes = require('./routes/AgentRoutes');
const authenticate = require('./routes/AuthenticateRoutes')

app.use('/owner', ownerRoutes);
app.use('/team-lead', teamLeadRoutes);
app.use('/manager', managerRoutes);
app.use('/supervisor', supervisorRoutes);
app.use('/agent', agentRoutes);
app.use("/",authenticate)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
