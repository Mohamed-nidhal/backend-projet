import express from "express";

import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")

  .post(
    (async (req, res) => {
      try{
      const { title, type, options } = req.body;
      console.log(title )
      console.log(type)
      console.log(options )
      const question = await Question.create({ title, type, options });
      if (!question) {
        res.status(400).json({ message: "error" });
      }
      res.status(201).json({ data: question });
    }catch(error){
      res.status(400).json({ message: error });
    }
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
