import mongoose from "mongoose";

// Define schema for color collection
const colorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Each color has a reference to the User model
      ref: "User",
    },
    backgroundColor: { type: String, default: "white", required: true },
    primaryTextColor: { type: String, default: "black", required: true },
    secondaryTextColor: { type: String, default: "lightgrey", required: true },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const Color = mongoose.model("Color", colorSchema);

export default Color;
