const mongoose = require('mongoose');
const User = require('./user');


const listingSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  child_comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

module.exports = mongoose.model('Comment', listingSchema);