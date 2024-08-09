// questionRoute.js

import express from "express";
import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { title, type, options, mandatory } = req.body;
      const question = await Question.create({ title, type, options, mandatory });
      if (!question) {
        res.status(400).json({ message: "error" });
      }
      res.status(201).json({ data: question });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .get(async (req, res) => {
    const questions = await Question.find({});
    if (!questions) {
      res.status(400).json({ message: "error" });
    }
    res.status(200).json({ data: questions });
  });

export default router;
