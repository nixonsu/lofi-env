import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getOriginalNode } from "typescript";
import { UserAuthInfoRequest } from "../types";
import Task from "../models/task.model";
import User from "../models/user.model";

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
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(task);
  }
);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(400);
      throw new Error("Task not found");
    }
    // Check that user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Ensure logged in user matches task user
    if (task.user.toString() !== user.id) {
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
      res.status(400);
      throw new Error("Task not found");
    }
    // Check that user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Ensure logged in user matches task user
    if (task.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(req.user.id);
  }
);

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
