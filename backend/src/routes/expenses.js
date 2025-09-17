const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Expense = mongoose.model('Expense', new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
}));

// GET all
router.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
});

// POST new
router.post('/', async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expense = new Expense({ title, amount, category, date });
  const saved = await expense.save();
  res.status(201).json(saved);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
