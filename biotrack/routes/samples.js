const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');
const { body, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

const sampleValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('source').notEmpty().withMessage('Source is required'),
  body('collectionDate').isISO8601().withMessage('Collection date must be a valid date'),
  body('storageLocation').notEmpty().withMessage('Storage location is required'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit').notEmpty().withMessage('Unit is required')
];

// GET /samples
router.get('/', async (req, res) => {
  /* #swagger.tags = ['Samples'] */
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /samples/:id
router.get('/:id', async (req, res) => {
  /* #swagger.tags = ['Samples'] */
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) return res.status(404).json({ error: 'Sample not found' });
    res.json(sample);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /samples - protected
router.post('/', isAuthenticated, sampleValidation, async (req, res) => {
  /* #swagger.tags = ['Samples']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Sample data',
       required: true,
       schema: {
         name: 'Soil Sample A',
         type: 'Soil',
         source: 'Field Station 1',
         collectionDate: '2026-04-01',
         storageLocation: 'Freezer B - Shelf 2',
         quantity: 500,
         unit: 'grams',
         notes: 'Collected during morning hours'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const sample = new Sample(req.body);
    const saved = await sample.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /samples/:id - protected
router.put('/:id', isAuthenticated, sampleValidation, async (req, res) => {
  /* #swagger.tags = ['Samples']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated sample data',
       required: true,
       schema: {
         name: 'Soil Sample A',
         type: 'Soil',
         source: 'Field Station 1',
         collectionDate: '2026-04-01',
         storageLocation: 'Freezer B - Shelf 3',
         quantity: 450,
         unit: 'grams',
         notes: 'Updated after partial use'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Sample not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /samples/:id - protected
router.delete('/:id', isAuthenticated, async (req, res) => {
  /* #swagger.tags = ['Samples'] */
  try {
    const deleted = await Sample.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Sample not found' });
    res.status(200).json({ message: 'Sample deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;