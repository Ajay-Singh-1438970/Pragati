import express from "express"
import { signup,login, getUser } from "../controllor/authController.js"
import User from "../models/User.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);

// router.get('/getuser/:email',getUser)
router.get('/getuser',authenticateUser,getUser)

export default router;