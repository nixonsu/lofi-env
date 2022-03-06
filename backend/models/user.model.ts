import mongoose from "mongoose";

const youtubeLinksArraySchema = new mongoose.Schema({
  link: {
    type: String,
  },
});

const tasksArraySchema = new mongoose.Schema({
  task: { type: String },
});

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
    tasksArray: { type: [tasksArraySchema], required: false },
    youtubeLinksArray: { type: [youtubeLinksArraySchema], required: false },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const User = mongoose.model("User", userSchema);

export default User;
