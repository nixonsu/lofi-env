import mongoose from "mongoose";

// Define schema for user collection
const colourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Each goal has a reference to the User model
      ref: "User",
    },
    colour: { type: String, required: false },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const Colour = mongoose.model("Colour", colourSchema);

export default Colour;
