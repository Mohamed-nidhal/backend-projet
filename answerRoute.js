import express from "express";
import AnswerModel from "./answerModel.js"; // Assuming your model is in answerModel.js

const router = express.Router();

// Get all answer documents
router.get("/", async (req, res) => {
    try {
        const answers = await AnswerModel.find({});
        res.status(200).json({ data: answers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching answers" });
    }
});

// Create a new answer document
router.post("/", async (req, res) => {
    try {
        const newAnswer = new AnswerModel(req.body);
        await newAnswer.save();
        res.status(201).json({ data: new Answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating answer" });
    }
});



export default router;
