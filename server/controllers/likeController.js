const Listing = require('../models/listing');
const User = require('../models/user');

async function likeListing(req, res) {
  const { userID, listingID } = req.body;

  try {
    const user = await User.findById(userID);
    const listing = await Listing.findById(listingID);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    const isLiked = user.liked_listings.includes(listingID);

    if (!isLiked) {
      // Like the listing
      user.liked_listings.push(listingID);
      listing.likes++;
    } else {
      // Unlike the listing
      user.liked_listings = user.liked_listings.filter(id => id.toString() !== listingID.toString());
      listing.likes--;
    }
    await user.save();
    await listing.save();
    delete user.password;
    return res.json(user);

  } catch (error) {
    console.error('Error liking/unliking listing:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = {
  likeListing
};
