// Add a recently opened file (FIXED)
router.post('/', async (req, res) => {
  const { userId, fileId, fileName, fileUrl } = req.body;
  const now = new Date();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove old file if exists (avoid duplicates)
    user.recentFiles = user.recentFiles.filter((f) => f.fileId !== fileId);

    // Add new at top
    user.recentFiles.unshift({
      fileId,
      fileName,
      fileUrl,
      openedAt: now
    });

    // Limit to last 5 items
    user.recentFiles = user.recentFiles.slice(0, 5);

    await user.save(); // <<< 🚨 IMPORTANT

    res.json({ success: true, recentFiles: user.recentFiles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
