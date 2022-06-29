import { Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAuthInfoRequest } from "../types";
import Color from "../models/color.model";
import User from "../models/user.model";

// @desc    Get colors
// @route   GET /api/colors
// @access  Private
const getColors = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    // Destructure colors because there can only be one colors resource per user
    const [colors] = await Color.find({ user: req.user.id });
    res.status(200).json(colors);
  }
);

// @desc    Update a color
// @route   PUT /api/colors/:id
// @access  Private
const updateColor = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const color = await Color.findById(req.params.id);
    if (!color) {
      res.status(404);
      throw new Error("Color not found");
    }
    // Check that user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // Ensure logged in user matches color user
    if (color.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedColor);
  }
);

export default {
  getColors,
  updateColor,
};
