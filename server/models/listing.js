const mongoose = require('mongoose');
const User = require('./user');
const Update = require('./update')
const Comment = require('./comment')

const listingSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: "Open" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String },
  deadline: { type: String, required: true },
  media: [{ type: String }],
  current_balance: { type: Number, default: 0 },
  target_balance: { type: Number, default: 0 },
  likes : {type: Number, default: 0},
  updates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Update'}],
  tags: [{ type: String}],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

module.exports = mongoose.model('Listing', listingSchema);