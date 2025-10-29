import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subject: {type: String},
    ref: "Semester",
    resource: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResourceType"
    }]
})

export default mongoose.Schema("Subject",subjectSchema);