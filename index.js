import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./dbConnect.js";
import questionRoute from "./questionRoute.js";
import answerRoute from "./answerRoute.js";

dotenv.config();
const app = express();

// Database connection
dbConnect();

// Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/question", (req, res, next) => {
  console.log(req.body); // Log incoming request body for debugging
  next();
}, questionRoute);

app.use("/answer", (req, res, next) => {
  console.log(req.body); // Log incoming request body for debugging
  next();
}, answerRoute);

// Root endpoint
app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

// Server listener
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
