const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  profilePicture: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);