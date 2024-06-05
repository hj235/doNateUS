const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing_id: { type: String, unique: true },
  created_at: { type: Date, default: Date.now },
  status: { type: String },
  description: { type: String},
  media: { type: URL},
  current_balance: { type: Number},
  target_balance: {type: Number}
});

module.exports = mongoose.model('Listing', listingSchema);