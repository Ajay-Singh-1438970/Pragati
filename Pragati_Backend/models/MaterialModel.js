// import mongoose from "mongoose";

// const materialSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subject: { type: String, required: true },
//   description: { type: String },
//   fileUrl: { type: String, required: true },   // yaha file ka path / link hoga
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// }, { timestamps: true });

// export default mongoose.model("Material", materialSchema);



import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true }, // ✅ file path/url
    semester: { type: String, required: true },
    type: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
