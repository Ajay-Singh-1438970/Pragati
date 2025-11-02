import mongoose from "mongoose";

const recentFileSchema = new mongoose.Schema({
    fileId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    openedAt: { type: Date, default: Date.now }
});

const userSchema = mongoose.Schema({
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    profileImg: { type: String, trim: true },
    role: { type: String, default: "user" },  // by default user
    avatar: { type: String, trim: true },
    recentFiles: { type: [recentFileSchema], default: [] }  ,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
