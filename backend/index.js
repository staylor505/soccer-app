import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/soccerRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/soccerDB";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send(`Soccer Management app is running on Port ${PORT}.`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

routes(app);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error.",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Your soccer server is running on Port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server.", error);
    process.exit(1);
  }
};

startServer();
