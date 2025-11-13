const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/todos
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/todos/:id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
