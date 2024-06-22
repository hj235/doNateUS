const mongoose = require('mongoose');
const Listing = require('./listing');

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  profilePicture: { type: String },
  created_at: { type: Date, default: Date.now },
  liked_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
});

module.exports = mongoose.model('User', userSchema);