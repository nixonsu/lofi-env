import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";

// @desc    Read users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Create user
// @route   POST /api/users
// @access  Private
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const user = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });
  res.status(200).json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export default { getUsers, registerUser, updateUser, deleteUser };
