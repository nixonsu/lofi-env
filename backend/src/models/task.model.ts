import mongoose from "mongoose";

// Define schema for user collection
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Each goal has a reference to the User model
      ref: "User",
    },
    text: { type: String, required: true },
    isDone: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Create mongoose model object from schema
const Task = mongoose.model("Task", taskSchema);

export default Task;
