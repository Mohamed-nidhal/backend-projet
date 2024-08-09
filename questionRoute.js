// questionRoute.js
import express from "express";
import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { title, type, options, mandatory, dependentOn } = req.body;
      
      // Validation des types de question
      if (!["text", "number", "email", "long-text", "multiple-choice", "likert"].includes(type)) {
        return res.status(400).json({ message: "Type de question invalide" });
      }

      // Préparation des données de la question
      const questionData = { title, type, options, mandatory };

      if (dependentOn) {
        // Vérifier si la question dépendante existe
        const dependentQuestion = await Question.findById(dependentOn);
        if (!dependentQuestion) {
          return res.status(400).json({ message: "La question dépendante n'a pas été trouvée" });
        }
        questionData.dependentOn = dependentOn;
      }

      // Création de la question
      const question = await Question.create(questionData);
      if (!question) {
        return res.status(400).json({ message: "Erreur lors de la création de la question" });
      }
      res.status(201).json({ data: question });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const questions = await Question.find({});
      if (!questions) {
        return res.status(400).json({ message: "Aucune question trouvée" });
      }
      res.status(200).json({ data: questions });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export default router;
