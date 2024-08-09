import express from "express";
import Question from "./questionModel.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { title, type, options, mandatory } = req.body;

      // Validation des types de question
      if (!["text", "number", "email", "long-text", "multiple-choice", "likert"].includes(type)) {
        return res.status(400).json({ message: "Type de question invalide" });
      }

      // Validation des options pour les types de question concernés
      if ((type === "multiple-choice" || type === "likert") && (!options || options.length === 0)) {
        return res.status(400).json({ message: "Les options sont requises pour ce type de question" });
      }

      // Trouver le dernier ID utilisé et incrémenter de 1
      const lastQuestion = await Question.findOne().sort({ id: -1 }).exec();
      const newId = lastQuestion ? lastQuestion.id + 1 : 0;

      // Préparation des données de la question
      const questionData = { id: newId, title, type, options, mandatory };

      // Création de la question
      const question = await Question.create(questionData);
      res.status(201).json({ data: question });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question:", error);
      res.status(500).json({ message: "Erreur serveur lors de la création de la question" });
    }
  })
  .get(async (req, res) => {
    try {
      const questions = await Question.find({});
      res.status(200).json({ data: questions });
    } catch (error) {
      console.error("Erreur lors de la récupération des questions:", error);
      res.status(500).json({ message: "Erreur serveur lors de la récupération des questions" });
    }
  });

export default router;
