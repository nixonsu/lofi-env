import { Request, Response } from "express";

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "Get users" });
};

// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Create user" });
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
};

export default { getUsers, createUser, updateUser, deleteUser };
