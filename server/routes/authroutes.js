const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;