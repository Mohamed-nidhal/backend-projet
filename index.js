import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./dbConnect.js";
import questionRoute from "./questionRoute.js";

dotenv.config();
const app = express();

console.log("test");
console.log(process.env.DB_URI);

dbConnect();

app.use(cors());

// Or allow specific origins
app.use(cors({
  origin: 'https://9000-idx-projet-1722864863490.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev'
}));

// app.use(cors());
// app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/question",(req, res, next)=>{
  console.log(req.body);
  next();
}, questionRoute);

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
