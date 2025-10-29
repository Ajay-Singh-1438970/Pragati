import express from "express";
import {
  getMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllor/materialController.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import multer from "multer";


const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ sab user view kar sakte hain
router.get("/", authenticateUser, getMaterials);
// router.get("/:id", authenticateUser, getMaterialById);

// ✅ sirf admin hi manage kar sakta hai
// router.post("/add", authenticateUser, addMaterial);
router.post("/add", authenticateUser, upload.single("file"), addMaterial);

// router.put("/:id", authenticateUser, updateMaterial);
router.put("/:id", authenticateUser, upload.single("file"), updateMaterial);

router.delete("/:id", authenticateUser, deleteMaterial);

export default router;
