const express = require('express');
const router = express.Router();
const Experiment = require('../models/Experiment');
const { body, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

const experimentValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('status').optional().isIn(['planned', 'ongoing', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('researcherId').notEmpty().withMessage('Researcher ID is required')
];

// GET /experiments
router.get('/', async (req, res) => {
  /* #swagger.tags = ['Experiments'] */
  try {
    const experiments = await Experiment.find();
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /experiments/:id
router.get('/:id', async (req, res) => {
  /* #swagger.tags = ['Experiments'] */
  try {
    const experiment = await Experiment.findById(req.params.id);
    if (!experiment) return res.status(404).json({ error: 'Experiment not found' });
    res.json(experiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /experiments - protected
router.post('/', isAuthenticated, experimentValidation, async (req, res) => {
  /* #swagger.tags = ['Experiments']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Experiment data',
       required: true,
       schema: {
         title: 'Soil Microbial Analysis',
         description: 'Analysis of microbial communities in soil samples',
         startDate: '2026-04-01',
         endDate: '2026-06-01',
         status: 'planned',
         researcherId: 'R001',
         sampleIds: ['S001', 'S002'],
         equipmentIds: ['E001'],
         results: ''
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const experiment = new Experiment(req.body);
    const saved = await experiment.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /experiments/:id - protected
router.put('/:id', isAuthenticated, experimentValidation, async (req, res) => {
  /* #swagger.tags = ['Experiments']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated experiment data',
       required: true,
       schema: {
         title: 'Soil Microbial Analysis',
         description: 'Analysis of microbial communities in soil samples',
         startDate: '2026-04-01',
         endDate: '2026-06-01',
         status: 'ongoing',
         researcherId: 'R001',
         sampleIds: ['S001', 'S002'],
         equipmentIds: ['E001'],
         results: 'Preliminary results show high diversity'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Experiment not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /experiments/:id - protected
router.delete('/:id', isAuthenticated, async (req, res) => {
  /* #swagger.tags = ['Experiments'] */
  try {
    const deleted = await Experiment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Experiment not found' });
    res.status(200).json({ message: 'Experiment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;