import mongoose from "mongoose";

// Define schema for user collection
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    name: { type: String, requried: [true, "Please add a name"] },
    password: { type: String, required: [true, "Please add a password"] },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const User = mongoose.model("User", userSchema);

export default User;
