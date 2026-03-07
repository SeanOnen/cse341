const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  professionalName: {
    type: String,
    required: true
  },
  base64Image: {
    type: String,
    default: ''
  },
  nameLink: {
    firstName: { type: String, required: true },
    url:       { type: String, required: true }
  },
  primaryDescription: {
    type: String,
    required: true
  },
  workDescription1: {
    type: String,
    default: ''
  },
  workDescription2: {
    type: String,
    default: ''
  },
  linkTitleText: {
    type: String,
    default: 'Find me online:'
  },
  linkedInLink: {
    text: { type: String, default: 'LinkedIn' },
    link: { type: String, default: '' }
  },
  githubLink: {
    text: { type: String, default: 'GitHub' },
    link: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Professional', professionalSchema);
