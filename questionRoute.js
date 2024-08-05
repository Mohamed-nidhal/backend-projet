import express from "express";

import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")

  .post(
    (async (req, res) => {
      const { title, type, options } = req.body;

      const question = await Question.create({ title, type, options });
      if (!question) {
        res.status(400).json({ message: "error" });
      }
      res.status(201).json({ data: question });
    })
  )
  .get(
    (async (req, res) => {
        const questions = await Question.find({});
      if (!questions) {
        res.status(400).json({ message: "error" });
      }
      res.status(201).json({ data: questions });
    }
  ));

export default router;
