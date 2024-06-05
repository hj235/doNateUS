// controller for register page at path '/register'

const Listing = require('../models/listing');

// create listing function
async function registerUser(req, res) {
    try {
        const { listing_id, status, title, description, media, target_balance } = req.body;
        // Check if fields are present? not sure if need since I'll add
        // a required attribute to the html input tag

        // Check for listing_id
        if (!listing_id) { // TO BE REMOVED
            return res.json({
                error: 'A listing id is needed'
            })
        }

        // Check for status
        if (!status) { // TO BE REMOVED
            return res.json({
                error: 'A status is needed'
            })
        }

        // Check for title
        if (!title) {
            return res.json({
                error: 'A title is needed'
            })
        }

        // Check for description
        if (!description) { // TO BE REMOVED
            return res.json({
                error: 'A description is needed'
            })
        }

        // Check for status
        if (!media) { // TO BE REMOVED
            return res.json({
                error: 'A media is needed'
            })
        }

        // Check for target_balance
        if (!target_balance) { // TO BE REMOVED
            return res.json({
                error: 'A target balance is needed'
            })
        }

        // // Check for title
        // const exist = await User.findOne({ email }); // finds a matching email in database
        // if (exist) {
        //     return res.json({
        //         error: 'Email has already been registered'
        //     });
        // }

        // Checks all passed, register user into database
        const listing = await Listing.create({
            listing_id, status, title, description, media, target_balance
        });

        return res.json(listing);

    // IDK what to do LMAO
    } catch (err) {
        return res.json('An error occurred in createListingController');
    }
}



// Test: successfully creates entry in mongoDB collection
// async function registerUser(req, res) {
//     const user = await User.create({
//         name: 'test',
//         email: 'test',
//         password: 'test'
//     });

//     return res.json(user);
// }

module.exports = {
    createListingController
};