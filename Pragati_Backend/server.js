import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectToDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import materialRoutes from './routes/materialRoute.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get('/test', (req, res) => res.send("hello"));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use("/api/users", userRoutes);


// Start server after DB connection
const port = process.env.PORT || 5000;

const startServer = async () => {
  console.log("🟡 Attempting to connect to MongoDB...");
  try {
    await connectToDB();
    console.log("🟢 MongoDB connection successful!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }

  console.log("🟢 Starting Express server...");
  app.listen(port, '0.0.0.0',() => {
    console.log(`✅ Server running and listening on port ${port}`);
  });
};

startServer();