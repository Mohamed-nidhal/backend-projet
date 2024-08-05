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
      // Transform the incoming data
      const transformedData = Object.entries(req.body).map(([name, answer]) => ({ name, answer })); 

      // Create the dataArray object as expected by the schema
      const dataArray = { dataArray: transformedData }; 
console.log(transformedData)
console.log(dataArray)
      const newAnswer = new AnswerModel(dataArray);
      await newAnswer.save();
      res.status(201).json({ data: newAnswer });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating answer" });
  }
});




export default router;
