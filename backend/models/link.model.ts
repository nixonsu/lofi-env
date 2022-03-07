import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Each goal has a reference to the User model
    ref: "User",
  },
  link: { type: String, required: false },
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
