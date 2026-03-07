const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');

// GET /professional
router.get('/', async (req, res) => {
  try {
    const data = await Professional.findOne();
    if (!data) return res.status(404).json({ error: 'No professional data found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;