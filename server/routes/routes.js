const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test} = require('../controllers/indexController');

// middleware
const corsOptions = {
    credentials: true, // allows cookies on the server side
    origin: "http://localhost:5173" // allows this client to communicate with the server
};

router.use(cors(corsOptions))

router.get('/', test)

module.exports = router;