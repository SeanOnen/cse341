const mongoose = require('mongoose');

const researcherSchema = new mongoose.Schema({
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  role:           { type: String, required: true },
  specialization: { type: String, required: true },
  department:     { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Researcher', researcherSchema);