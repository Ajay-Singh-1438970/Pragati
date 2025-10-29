import mongoose from "mongoose";

const recentFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileId: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  openedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("RecentFile", recentFileSchema);
