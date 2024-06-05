const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing_id: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  status: { type: String, default: "Open"},
  title: { type: String, required: true},
  description: { type: String},
  media: { type: URL},
  current_balance: { type: Number, default: 0},
  target_balance: {type: Number, default: 0}
});

module.exports = mongoose.model('Listing', listingSchema);