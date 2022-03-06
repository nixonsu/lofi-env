import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Get users" });
});

// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }
  res.status(200).json({ message: "Create user" });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

export default { getUsers, createUser, updateUser, deleteUser };
