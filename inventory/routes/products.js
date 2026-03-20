const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

// Validation rules
const productValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('category').notEmpty().withMessage('Category is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('inStock').isBoolean().withMessage('inStock must be a boolean')
];

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products
router.post('/', productValidation, async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product data',
        required: true,
        schema: {
          name: 'Laptop',
          description: 'A powerful laptop',
          price: 999.99,
          quantity: 10,
          category: 'Electronics',
          brand: 'Dell',
          sku: 'DELL-001',
          inStock: true
        }
  } */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /products/:id
router.put('/:id', productValidation, async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated product data',
        required: true,
        schema: {
          name: 'Laptop',
          description: 'A powerful laptop',
          price: 999.99,
          quantity: 10,
          category: 'Electronics',
          brand: 'Dell',
          sku: 'DELL-001',
          inStock: true
        }
  } */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;