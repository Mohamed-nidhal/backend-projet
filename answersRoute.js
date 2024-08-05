import express from "express";
import Answer from "./answerModel.js"; 

const router = express.Router();


router.post("/", async (req, res) => {
  const answersData = req.body; 

  try {
    const newAnswers = await Promise.all(
      answersData.map(async (answerData) => {
        const { question, answer } = answerData;
        return await Answer.create({ question, answer });
      })
    );

    res.status(201).json({ data: newAnswers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating answers" });
  }
});

export default router;
