import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Each color has a reference to the User model
      ref: "User",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl",
    },
    title: {
      type: String,
      required: true,
      default: "lofi hip hop radio - beats to relax/study to",
    },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
