// routes/teamLeadRoutes.js
const express = require('express');
const router = express.Router();
const teamLeadController = require('../controllers/TeamLeadController');

router.post('/distribute-calls', teamLeadController.distributeCalls);

module.exports = router;
