const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, editUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/api/user/edit/:id', editUser);

module.exports = router;