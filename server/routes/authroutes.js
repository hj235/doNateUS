const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, editUser, getUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/api/user/edit/:id', editUser);
router.get('/api/user/get/:id', getUser);

module.exports = router;