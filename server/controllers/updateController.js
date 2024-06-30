const Listing = require('../models/listing');
const Update = require('../models/update');

async function createUpdate(req, res) {
    const { listingID, title, description } = req.body;
    console.log("Received listingID:", listingID); // Add this line

    try {
        const listing = await Listing.findById(listingID);
        console.log("Found listing:", listing); // Add this line

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        const update = await Update.create({
            title, description
        });

        await Listing.findByIdAndUpdate(
            listingID,
            { $push: { updates: update._id } },
            { new: true }
        );

        return res.status(201).json({ message: 'Update created successfully.', update });

    } catch (error) {
        console.error('Error creating update', error);
        return res.status(500).json({ error: 'Server error.' });
    }
}

async function getUpdate(req ,res) {
    const { id } = req.params;
    try {
        const update= await Update.findById(id)
        return res.json(update)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUpdate,
    getUpdate
};
