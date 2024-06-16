// controller for register page at path '/register'

const Listing = require('../models/listing');

// create listing function
async function createListing(req, res) {
    try {
        const {  title, description, type, deadline, media, target_balance, owner} = req.body;
        // Check if fields are present? not sure

        // Checks all passed, register user into database
        const listing = await Listing.create({
            title, description, media, target_balance, owner
        });

        return res.json(listing);

    // IDK what to do LMAO
    } catch (err) {
        return res.json(err);
    }
}

// get all listings function
async function getListings(req ,res) {
    try {
        const listings = await Listing.find().populate('owner')
        return res.json(listings)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    createListing,
    getListings
};