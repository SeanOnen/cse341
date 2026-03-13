const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /contacts
router.get('/', async (req, res) => {
  res.json(await Contact.find());
});

// GET /contacts/:id
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /contacts
router.post('/', async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact data',
        required: true,
        schema: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          favoriteColor: 'Blue',
          birthday: '1990-01-15'
        }
  } */
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /contacts/:id
router.put('/:id', async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated contact data',
        required: true,
        schema: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          favoriteColor: 'Blue',
          birthday: '1990-01-15'
        }
  } */
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /contacts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;