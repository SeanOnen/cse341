const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const { body, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

const equipmentValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('serialNumber').notEmpty().withMessage('Serial number is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('status').optional().isIn(['available', 'in-use', 'maintenance', 'retired']).withMessage('Invalid status')
];

// GET /equipment
router.get('/', async (req, res) => {
  /* #swagger.tags = ['Equipment'] */
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /equipment/:id
router.get('/:id', async (req, res) => {
  /* #swagger.tags = ['Equipment'] */
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /equipment - protected
router.post('/', isAuthenticated, equipmentValidation, async (req, res) => {
  /* #swagger.tags = ['Equipment']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Equipment data',
       required: true,
       schema: {
         name: 'Centrifuge X200',
         type: 'Centrifuge',
         serialNumber: 'CX200-001',
         location: 'Lab Room 3',
         status: 'available',
         lastMaintenance: '2026-01-15',
         nextMaintenance: '2026-07-15'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const equipment = new Equipment(req.body);
    const saved = await equipment.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /equipment/:id - protected
router.put('/:id', isAuthenticated, equipmentValidation, async (req, res) => {
  /* #swagger.tags = ['Equipment']
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated equipment data',
       required: true,
       schema: {
         name: 'Centrifuge X200',
         type: 'Centrifuge',
         serialNumber: 'CX200-001',
         location: 'Lab Room 4',
         status: 'in-use',
         lastMaintenance: '2026-01-15',
         nextMaintenance: '2026-07-15'
       }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Equipment not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /equipment/:id - protected
router.delete('/:id', isAuthenticated, async (req, res) => {
  /* #swagger.tags = ['Equipment'] */
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Equipment not found' });
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;