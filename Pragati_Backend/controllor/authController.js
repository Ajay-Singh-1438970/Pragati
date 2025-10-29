import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, avatar } = req.body;

    // 1. Validate input
    if (!fullName || !email || !password || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
      avatar,
    });

    // 5. Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // console.log(newUser);
    return res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, avatar: newUser.avatar },
      token,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const count = await User.countDocuments();
    // console.log(count);
    if(count === 0) {
      const newAdmin = await User.create({email, password, role: 'admin'});
      return res.status(201).json({success: true, admin: newAdmin, message: "Admin registered successfully"})
    }
    

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if(user.role === 'admin') {
      const adminToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, avatar: user.avatar },
      token: adminToken,
    })
    }
    
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // console.log(user);

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, avatar: user.avatar },
      token,
    });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: "Please Sign Up!! , You are not a registered user" });
  } 
};



//get user
export const getUser = async (req,res)=>{
  try {
    // const user = req.params.email;
    const user = req.user;
    // const existingUser = await User.find({email:user});
    const existingUser = await User.findById(user._id);
    if(user){
      return res.status(201).json({message: "User found", user: existingUser})
    }
  } catch (error) {
    return res.status(500).json({message: "something went wrong", error})
  }
}