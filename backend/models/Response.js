import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    question: String,
    answer: String,
    timestamp: { type: Date, default: Date.now },
  });
  
  const Response = mongoose.model("Response", responseSchema);
  export default Response;