import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectToDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import materialRoutes from './routes/materialRoute.js';
import userRoutes from './routes/userRoutes.js';
import sendEmail from "./utils/sendEmail.js";
import recentFilesRoute from "./routes/recentFiles.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());  // used for supporting all the frameworks and library.
app.use(express.urlencoded({ extended: true }));  // used for supporting forms like login forms for using post method
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get('/', (req, res) => res.send("hello from backend"));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recentFiles", recentFilesRoute);

//////////////////////////////////////////////////////
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail("ajaysingh1438970@gmail.com", "Test Email", "<h1>THIS IS THE PRAGATI PROJECT TESTING EMAIL !!. Gmail SMTP is working 🚀</h1>");
    res.send("✅ Test email sent successfully");
  } catch (err) {
    res.status(500).send("❌ Failed to send email: " + err.message);
  }
});

// This is to manage invalid routes and 404 errors from backend
app.use((req, res) => {
  res.status(404).send("Check your URL, Route not found!");
});

//////////////////////////////////////////////////////

// Start server after DB connection
const port = process.env.PORT || 5000;

connectToDB()

app.listen(port, () => {
      console.log(`✅ Server running on ${port}`);
    });