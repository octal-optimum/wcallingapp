// routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/AgentControllers');

router.post('/receive-call', agentController.receiveCall);
router.post('/make-call', agentController.makeCall);
router.post('/update-status', agentController.updateCallStatus);


module.exports = router;
