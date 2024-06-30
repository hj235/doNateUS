const express = require('express');
const router = express.Router();
const { createUpdate, getUpdate } = require('../controllers/updateController');

// Updates
router.post('/create', createUpdate);
router.get('/:id', getUpdate);

module.exports = router;