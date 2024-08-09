import express from "express";
import Question from "./questionModel.js";

const router = express.Router();

// Helper function to get the next question ID
const getNextQuestionId = async () => {
  const lastQuestion = await Question.findOne().sort({ _id: -1 }).limit(1);
  return lastQuestion ? lastQuestion._id + 1 : 0; // Start from 0 if no questions exist
};

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { title, type, options, mandatory, dependentOn } = req.body;

      // Check if the dependent question exists
      if (dependentOn) {
        const dependentQuestion = await Question.findById(dependentOn);
        if (!dependentQuestion) {
          return res.status(400).json({ message: "Dependent question not found" });
        }
      }

      const nextId = await getNextQuestionId();

      const questionData = { _id: nextId, title, type, options, mandatory };

      if (dependentOn) {
        questionData.dependentOn = dependentOn;
      }

      const question = await Question.create(questionData);
      if (!question) {
        return res.status(400).json({ message: "Error creating question" });
      }
      res.status(201).json({ data: question });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const questions = await Question.find({});
      if (!questions) {
        return res.status(400).json({ message: "No questions found" });
      }
      res.status(200).json({ data: questions });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export default router;
