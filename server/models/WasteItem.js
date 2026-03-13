const mongoose = require('mongoose');

const wasteItemSchema = new mongoose.Schema({
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wasteType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: { type: String, enum: ['available', 'reserved', 'exchanged'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('WasteItem', wasteItemSchema);
