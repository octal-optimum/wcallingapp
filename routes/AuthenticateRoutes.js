// routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/Authentication');

router.post('/login',loginController.login);
router.post('/register',loginController.register);

module.exports = router;
