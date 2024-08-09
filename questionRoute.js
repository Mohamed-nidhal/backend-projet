const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');

// POST route to add a new question
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Log request body
  try {
    const { title, type, options, mandatory } = req.body;
    const question = await Question.create({ title, type, options, mandatory });
    if (!question) {
      return res.status(400).json({ message: "Error creating question" });
    }
    res.status(201).json({ data: question });
  } catch (error) {
    console.error("Error creating question:", error); // Log error
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({});
    if (!questions) {
      return res.status(400).json({ message: "No questions found" });
    }
    res.status(200).json({ data: questions });
  } catch (error) {
    console.error("Error fetching questions:", error); // Log error
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
