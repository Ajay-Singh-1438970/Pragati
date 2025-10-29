import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET total user count
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Server error while counting users" });
  }
});

export default router;
