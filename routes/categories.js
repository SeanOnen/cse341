const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /categories - return all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /categories/:id - return a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /categories - create a new category
router.post('/', async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Category data',
        required: true,
        schema: {
          name: 'Electronics',
          description: 'Electronic devices and accessories'
        }
  } */
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /categories/:id - update a category
router.put('/:id', async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated category data',
        required: true,
        schema: {
          name: 'Electronics',
          description: 'Electronic devices and accessories'
        }
  } */
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /categories/:id - delete a category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;