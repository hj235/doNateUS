const express = require('express');
const router = express.Router();
const {createListing, getListings, deleteListing, updateListing} = require('../controllers/listingController');


router.get('/', getListings)
router.post('/create', createListing)
router.get('/discover', getListings)

// testing
// router.delete('/:id', deleteListing)
// router.patch('/:id', updateListing)



module.exports = router;