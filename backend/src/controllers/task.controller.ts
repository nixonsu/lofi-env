import { Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAuthInfoRequest } from "../types";
import Task from "../models/task.model";

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  }
);

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please add a text field");
    }
    const task = await Task.create({
      user: req.user.id,
      text: req.body.text,
      isDone: false,
    });
    res.status(201).json(task);
  }
);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    // Check that user exists
    if (!req.user) {
      res.status(404);
      throw new Error("User not found");
    }
    // Ensure logged in user matches task user
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  }
);

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    // Check that user exists
    if (!req.user) {
      res.status(404);
      throw new Error("User not found");
    }
    // Ensure logged in user matches task user
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  }
);

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
