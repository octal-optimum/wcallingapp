// routes/ownerRoutes.js
const express = require('express');

const router = express.Router();
const ownerController = require('../controllers/OwnerControllers');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for storing file buffer

router.post('/distribute-calls', ownerController.distributeCalls);
router.post('/upload',  upload.single('file'), ownerController.callsDataUpload);
router.post("/create-role", ownerController.createRole)


module.exports = router;
