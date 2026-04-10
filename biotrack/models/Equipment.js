const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  type:            { type: String, required: true },
  serialNumber:    { type: String, required: true, unique: true },
  location:        { type: String, required: true },
  status:          { type: String, enum: ['available', 'in-use', 'maintenance', 'retired'], default: 'available' },
  lastMaintenance: { type: Date },
  nextMaintenance: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);