const express = require('express');
const router = express.Router();
const {createListing, getListings, getSingleListing, getLikedListings, deleteListing, updateListing} = require('../controllers/listingController');
const {likeListing} = require('../controllers/likeController');

// Listings
router.get('/', getListings)
router.post('/create', createListing)
router.get('/discover', getListings)
router.get('/:id', getSingleListing)
router.get('/liked/:id', getLikedListings)
router.post('/like', likeListing)
router.delete('/delete/:id', deleteListing);
router.patch('/update/:id', updateListing);

module.exports = router;