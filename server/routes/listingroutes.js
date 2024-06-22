const express = require('express');
const router = express.Router();
const {createListing, getListings, getSingleListing, deleteListing, updateListing} = require('../controllers/listingController');
const {likeListing} = require('../controllers/likeController');

router.get('/', getListings)
router.post('/create', createListing)
router.get('/discover', getListings)
router.get('/:id', getSingleListing)
router.post('/like', likeListing)

// testing
// router.delete('/listing/:id', deleteListing)
// router.patch('/listing/:id', updateListing)



module.exports = router;