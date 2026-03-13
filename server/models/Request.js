const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wasteItem: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteItem', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  viewed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
