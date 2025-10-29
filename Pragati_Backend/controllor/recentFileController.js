import RecentFile from "../models/RecentFile.js";

// GET recent files for a user
export const getRecentFiles = async (req, res) => {
  try {
    const { userId } = req.params;

    const files = await RecentFile.find({ userId })
      .sort({ openedAt: -1 })
      .limit(5);

    res.json(files);
  } catch (error) {
    console.error("Error fetching recent files:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST new recent file (or update existing one)
export const addRecentFile = async (req, res) => {
  try {
    const { userId, fileId, fileName, fileUrl } = req.body;

    if (!userId || !fileId || !fileName || !fileUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already exists
    const existing = await RecentFile.findOne({ userId, fileId });

    if (existing) {
      // Update timestamp if already opened
      existing.openedAt = new Date();
      await existing.save();
    } else {
      // Insert new entry
      const recentFile = new RecentFile({ userId, fileId, fileName, fileUrl });
      await recentFile.save();
    }

    // Keep only last 5 entries
    const all = await RecentFile.find({ userId }).sort({ openedAt: -1 });
    if (all.length > 5) {
      const excess = all.slice(5);
      for (const file of excess) {
        await RecentFile.findByIdAndDelete(file._id);
      }
    }

    res.status(201).json({ message: "Recent files updated" });
  } catch (error) {
    console.error("Error saving recent file:", error);
    res.status(500).json({ message: "Server error" });
  }
};
