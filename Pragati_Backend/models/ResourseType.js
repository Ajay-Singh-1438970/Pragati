import mongoose from "mongoose";

const ResourseTypeSchema = mongoose.Schema({
    resouseType: {type: String},
    resourse: {type: String},
    subject: { ref: "Subject"}
})