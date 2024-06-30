// controller for register page at path '/register'

const Listing = require('../models/listing');
const User = require('../models/user');

// create listing function
async function createListing(req, res) {
    try {
        const {  title, description, type, deadline, media, target_balance, owner} = req.body;
        // Check if fields are present? not sure

        // Checks all passed, register user into database
        const listing = await Listing.create({
            title, description, type, deadline, media, target_balance, owner
        });

        return res.json(listing);

    // IDK what to do LMAO
    } catch (err) {
        return res.json(err);
    }
}

// get all listings
async function getListings(req ,res) {
    try {
        const listings = await Listing.find().populate('owner')
        return res.json(listings)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get single listing
async function getSingleListing(req ,res) {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id).populate('owner')
        return res.json(listing)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

async function getLikedListings(req ,res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('liked_listings')
        return res.json(user.liked_listings);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

async function updateListing(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
        const listing = await Listing.findByIdAndUpdate(id, updates, { new: true }).populate('owner');
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        return res.json(listing);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function deleteListing(req, res) {
    const { id } = req.params;
    try {
        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        const updatePromises = [];
        const usersToUpdate = await User.find({ liked_listings: id });

        usersToUpdate.forEach(user => {
            user.liked_listings = user.liked_listings.filter(listingId => listingId !== id);
            updatePromises.push(user.save());
        });

        await Promise.all(updatePromises);

        return res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createListing,
    getListings,
    getSingleListing,
    getLikedListings,
    updateListing,
    deleteListing
};