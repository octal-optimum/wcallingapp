// routes/supervisorRoutes.js
const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/SuperVisorController');

router.post('/distribute-calls', supervisorController.distributeCalls);

module.exports = router;
