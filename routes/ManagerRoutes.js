// routes/managerRoutes.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/ManagerController');

router.post('/distribute-calls', managerController.distributeCalls);

module.exports = router;
