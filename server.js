const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Use environment variable or default port 5000
const port = process.env.PORT || 5001;

// Enable CORS to allow requests from the frontend
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

// MongoDB connection URL
const mongoURI = "mongodb://127.0.0.1:27017/flashcardDB"; // Update with your local MongoDB database name

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Mongoose Schema and Model
const QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  answer: String,
  company: String,
});

const Question = mongoose.model("Question", QuestionSchema);

// API endpoint to fetch questions by topic
app.get("/api/questions", async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const questions = await Question.find({ topic }).exec();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// API endpoint to add a question (optional, for testing purposes)
app.post("/api/questions", async (req, res) => {
  const { topic, question, answer, company } = req.body;

  if (!topic || !question || !answer) {
    return res.status(400).json({ error: "Topic, question, and answer are required" });
  }

  try {
    const newQuestion = new Question({ topic, question, answer, company });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
