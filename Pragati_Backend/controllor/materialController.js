// import Material from "../models/MaterialModel.js";

// // 📌 Add Material (Admin only)
// export const addMaterial = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can upload materials" });
//     }

//     const { title, subject, description, fileUrl,  } = req.body;

//     const newMaterial = new Material({
//       title,
//       subject,
//       description,
//       fileUrl,
//       uploadedBy: req.user._id
//     });

//     await newMaterial.save();
//     res.status(201).json({ message: "Material uploaded successfully", newMaterial });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📌 Get All Materials
// export const getMaterials = async (req, res) => {
//   try {
//     const materials = await Material.find().populate("uploadedBy", "fullName email");
//     res.json(materials);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📌 Get Material by ID
// export const getMaterialById = async (req, res) => {
//   try {
//     const material = await Material.findById(req.params.id);
//     if (!material) return res.status(404).json({ message: "Material not found" });

//     res.json(material);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📌 Delete Material (Admin only)
// export const deleteMaterial = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can delete materials" });
//     }

//     const material = await Material.findByIdAndDelete(req.params.id);
//     if (!material) return res.status(404).json({ message: "Material not found" });

//     res.json({ message: "Material deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import Material from "../models/MaterialModel.js";
// import fs from "fs";
// import path from "path";

// // Get all materials
// export const getMaterials = async (req, res) => {
//   try {
//     const materials = await Material.find();
//     return res.json(materials);
//   } catch (error) {
//     console.error("Error in getMaterials:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Add material
// export const addMaterial = async (req, res) => {
//   try {
//     // form fields
//     const { title, subject, type, semester } = req.body;

//     // Validate important fields
//     if (!title || !type || !semester) {
//       return res.status(400).json({ message: "title, type and semester are required" });
//     }

//     // multer will populate req.file for uploaded file
//     if (!req.file) {
//       return res.status(400).json({ message: "File is required" });
//     }

//     // use subject if provided, otherwise fallback to title
//     const finalSubject = subject || title;

//     const fileUrl = `/uploads/${req.file.filename}`;

//     const newMaterial = new Material({
//       title,
//       subject: finalSubject,
//       type,
//       semester,
//       fileUrl,
//     });

//     await newMaterial.save();

//     return res.status(201).json({ message: "Material uploaded successfully", newMaterial });
//   } catch (error) {
//     console.error("Error in addMaterial:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Update material
// export const updateMaterial = async (req, res) => {
//   try {
//     const { title, subject, type, semester } = req.body;
//     const material = await Material.findById(req.params.id);
//     if (!material) return res.status(404).json({ message: "Material not found" });

//     // If new file uploaded, delete old file (if exists) then replace
//     if (req.file) {
//       if (material.fileUrl) {
//         const oldFilename = material.fileUrl.split("/").pop();
//         const oldPath = path.join(process.cwd(), "uploads", oldFilename);
//         if (fs.existsSync(oldPath)) {
//           try { fs.unlinkSync(oldPath); } catch (e) { console.warn("Could not delete old file:", e); }
//         }
//       }
//       material.fileUrl = `/uploads/${req.file.filename}`;
//     }

//     // update fields (use fallback to previous)
//     material.title = title || material.title;
//     material.subject = subject || material.subject;
//     material.type = type || material.type;
//     material.semester = semester || material.semester;

//     const updatedMaterial = await material.save();
//     return res.json({ message: "Material updated successfully", updatedMaterial });
//   } catch (error) {
//     console.error("Error in updateMaterial:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete material
// export const deleteMaterial = async (req, res) => {
//   try {
//     const material = await Material.findById(req.params.id);
//     if (!material) return res.status(404).json({ message: "Material not found" });

//     // delete file if exists
//     if (material.fileUrl) {
//       const filename = material.fileUrl.split("/").pop();
//       const filePath = path.join(process.cwd(), "uploads", filename);
//       if (fs.existsSync(filePath)) {
//         try { fs.unlinkSync(filePath); } catch (e) { console.warn("Could not delete file:", e); }
//       }
//     }

//     await Material.findByIdAndDelete(req.params.id);
//     return res.json({ message: "Material deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteMaterial:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

//Updated Code
import Material from "../models/MaterialModel.js";
import fs from "fs";
import path from "path";

// ✅ Get all materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    return res.json(materials);
  } catch (error) {
    console.error("Error in getMaterials:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add material (using fileUrl instead of file upload)
export const addMaterial = async (req, res) => {
  try {
    const { title, subject, type, semester, fileUrl } = req.body;

    // Validate important fields
    if (!title || !type || !semester || !fileUrl) {
      return res
        .status(400)
        .json({ message: "title, type, semester and file link are required" });
    }

    const finalSubject = subject || title;

    // Save fileUrl directly (no multer)
    const newMaterial = new Material({
      title,
      subject: finalSubject,
      type,
      semester,
      fileUrl, // this is a full link now
    });

    await newMaterial.save();

    return res
      .status(201)
      .json({ message: "Material added successfully", newMaterial });
  } catch (error) {
    console.error("Error in addMaterial:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update material
export const updateMaterial = async (req, res) => {
  try {
    const { title, subject, type, semester, fileUrl } = req.body;
    const material = await Material.findById(req.params.id);

    if (!material) return res.status(404).json({ message: "Material not found" });

    // Update all editable fields
    material.title = title || material.title;
    material.subject = subject || material.subject;
    material.type = type || material.type;
    material.semester = semester || material.semester;
    if (fileUrl) material.fileUrl = fileUrl; // replace with new link if provided

    const updatedMaterial = await material.save();
    return res.json({ message: "Material updated successfully", updatedMaterial });
  } catch (error) {
    console.error("Error in updateMaterial:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    // If fileUrl points to local uploads, try deleting it
    if (material.fileUrl && material.fileUrl.startsWith("/uploads/")) {
      const filename = material.fileUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn("Could not delete file:", e);
        }
      }
    }

    await Material.findByIdAndDelete(req.params.id);
    return res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMaterial:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
