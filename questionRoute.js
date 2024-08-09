import express from "express";
import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { title, type, options, mandatory, dependentOn } = req.body;
      const questionData = { title, type, options, mandatory };

      if (dependentOn) {
        // Check if the dependent question exists
        const dependentQuestion = await Question.findById(dependentOn);
        if (!dependentQuestion) {
          return res.status(400).json({ message: "Dependent question not found" });
        }
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
