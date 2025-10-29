import mongoose from "mongoose";

async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB:", conn.connection.host);
    return conn; // important: return so .then() works
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err; // rethrow so server catch works
  }
}

export default connectToDB;
