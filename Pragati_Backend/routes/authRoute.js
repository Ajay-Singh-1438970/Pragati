import express from "express"
import { signup,login, getUser } from "../controllor/authController.js"
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).json({ message: "Invalid token" });

    
    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified!" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    
    res.status(200).json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    console.error("Verification Error:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

router.post('/signup', signup);
router.post('/login',login);
// router.get('/getuser/:email',getUser)
router.get('/getuser',authenticateUser,getUser);

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    // `req.user` is already populated by middleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/update-profile", authenticateUser, async (req, res) => {
  try {
    const { fullName, password, avatar, profileImg } = req.body;
    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (avatar) updateData.avatar = avatar;
    if (profileImg) updateData.profileImg = profileImg;

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ success: true, updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;