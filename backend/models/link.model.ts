import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Each color has a reference to the User model
      ref: "User",
    },
    url: { type: String, required: false },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
