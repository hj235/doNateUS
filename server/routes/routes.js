// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const {test} = require('../controllers/indexController');
// const {registerUser} = require('../controllers/authController');
// const {loginUser} = require('../controllers/loginController');
// const {createListing, getListings, deleteListing, updateListing} = require('../controllers/listingController');

// // middleware
// const corsOptions = {
//     credentials: true, // allows cookies on the server side
//     origin: process.env.CLIENT_URL // allows this client to communicate with the server
// };
// router.use(cors(corsOptions));

// // define routes

// // pages
// router.get('/', test);
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/create', createListing)

// // testing
// router.get('/discover', getListings)
// // router.delete('/:id', deleteListing)
// // router.patch('/:id', updateListing)



// module.exports = router;