import mongoose from "mongoose";

// Define schema for user collection
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, requried: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const User = mongoose.model("User", userSchema);

export default User;
