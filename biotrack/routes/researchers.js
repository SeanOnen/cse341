const express = require('express');
const router = express.Router();
const Researcher = require('../models/Researcher');
const { body, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

const researcherValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('department').notEmpty().withMessage('Department is required')
];

// GET /researchers
router.get('/', async (req, res) => {
  /* #swagger.tags = ['Researchers'] */
  try {
    const researchers = await Researcher.find();
    res.json(researchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /researchers/:id
router.get('/:id', async (req, res) => {
  /* #swagger.tags = ['Researchers'] */
  try {
    const researcher = await Researcher.findById(req.params.id);
    if (!researcher) return res.status(404).json({ error: 'Researcher not found' });
    res.json(researcher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /researchers - protected
router.post('/', isAuthenticated, researcherValidation, async (req, res) => {
  /* #swagger.tags = ['Researchers']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Researcher data',
       required: true,
       schema: {
         firstName: 'Sean',
         lastName: 'Onen',
         email: 'sean@biotrack.com',
         role: 'Lead Researcher',
         specialization: 'Soil Microbiology',
         department: 'Biosystems Engineering'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const researcher = new Researcher(req.body);
    const saved = await researcher.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /researchers/:id - protected
router.put('/:id', isAuthenticated, researcherValidation, async (req, res) => {
  /* #swagger.tags = ['Researchers']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated researcher data',
       required: true,
       schema: {
         firstName: 'Sean',
         lastName: 'Onen',
         email: 'sean@biotrack.com',
         role: 'Senior Researcher',
         specialization: 'Soil Microbiology',
         department: 'Biosystems Engineering'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Researcher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Researcher not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /researchers/:id - protected
router.delete('/:id', isAuthenticated, async (req, res) => {
  /* #swagger.tags = ['Researchers'] */
  try {
    const deleted = await Researcher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Researcher not found' });
    res.status(200).json({ message: 'Researcher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;