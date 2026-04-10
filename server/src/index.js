import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
