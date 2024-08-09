import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./dbConnect.js";
import questionRoute from "./questionRoute.js";
import answerRoute from "./answerRoute.js";

dotenv.config();
const app = express();

console.log("test");
console.log(process.env.DB_URI);

dbConnect();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/question",(req, res, next)=>{
  console.log(req.body);
  next();
}, questionRoute);
app.use("/answer",(req, res, next)=>{
  console.log(req.body);
  next();
},answerRoute);

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});