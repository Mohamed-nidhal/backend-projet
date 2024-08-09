const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['text', 'number', 'email', 'long-text', 'multiple-choice', 'likert'], required: true },
  options: { type: [String], default: [] },
  mandatory: { type: Boolean, default: false }
});

module.exports = mongoose.model('Question', questionSchema);
