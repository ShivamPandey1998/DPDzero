const express = require('express');
const router = express.Router();
const UserController = require('./UserController');
const DataController = require('./DataController');

router.post('/api/register', UserController.register);
router.post('/api/token', UserController.generateToken);
router.post('/api/data', DataController.storeData);
router.get('/api/data/:key', DataController.retrieveData);
router.put('/api/data/:key', DataController.updateData);
router.delete('/api/data/:key', DataController.deleteData);

module.exports = router; 
