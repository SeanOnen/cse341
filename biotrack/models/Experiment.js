const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  startDate:    { type: Date, required: true },
  endDate:      { type: Date },
  status:       { type: String, enum: ['planned', 'ongoing', 'completed', 'cancelled'], default: 'planned' },
  researcherId: { type: String, required: true },
  sampleIds:    { type: [String], default: [] },
  equipmentIds: { type: [String], default: [] },
  results:      { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Experiment', experimentSchema);