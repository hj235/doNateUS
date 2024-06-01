const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test} = require('../controllers/indexController');
const {registerUser} = require('../controllers/registerController');

// middleware
const corsOptions = {
    credentials: true, // allows cookies on the server side
    origin: "http://localhost:5173" // allows this client to communicate with the server
};
router.use(cors(corsOptions));

// define routes
router.get('/', test);
router.post('/register', registerUser);

module.exports = router;