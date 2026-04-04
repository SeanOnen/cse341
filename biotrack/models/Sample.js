const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  type:             { type: String, required: true },
  source:           { type: String, required: true },
  collectionDate:   { type: Date, required: true },
  storageLocation:  { type: String, required: true },
  quantity:         { type: Number, required: true },
  unit:             { type: String, required: true },
  notes:            { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Sample', sampleSchema);