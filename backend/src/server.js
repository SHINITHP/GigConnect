import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Server error:", error);
  }
});
