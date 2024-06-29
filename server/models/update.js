const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Update', updateSchema);