import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/recentFiles
router.post("/", async (req, res) => {
  const { userId, fileId, fileName, fileUrl } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove duplicate if it exists
    user.recentFiles = user.recentFiles.filter(f => f.fileId !== fileId);

    // Add new file at the top
    user.recentFiles.unshift({
      fileId,
      fileName,
      fileUrl,
      openedAt: new Date()
    });

    // Keep only last 5 recent files
    user.recentFiles = user.recentFiles.slice(0, 5);

    await user.save();

    res.json({ success: true, recentFiles: user.recentFiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/recentFiles/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.recentFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
