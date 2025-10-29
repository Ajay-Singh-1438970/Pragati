import mongoose from "mongoose";

const semesterSchema = mongoose.Schema({
    semesterName: {type: String},
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }]
})

export default mongoose.model("Semester",semesterSchema);