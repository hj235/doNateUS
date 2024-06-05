const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing_id: { type: String, unique: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);