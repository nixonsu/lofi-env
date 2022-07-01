import { Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAuthInfoRequest } from "../types";
import Link from "../models/link.model";
import User from "../models/user.model";

// @desc    Get links
// @route   GET /api/links
// @access  Private
const getLinks = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const links = await Link.find({ user: req.user.id });
    res.status(200).json(links);
  }
);

// @desc    Create a new link
// @route   POST /api/links
// @access  Public
const createLink = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    if (!req.body.url) {
      res.status(400);
      throw new Error("Please add a url field");
    }
    const link = await Link.create({
      url: req.body.url,
      title: req.body.title,
      user: req.user.id,
    });
    res.status(201).json(link);
  }
);

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private
const updateLink = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const link = await Link.findById(req.params.id);
    if (!link) {
      res.status(404);
      throw new Error("Link not found");
    }
    // Check that user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // Ensure logged in user matches link user
    if (link.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedLink);
  }
);

// @desc    Delete a link
// @route   DELETE /api/links/:id
// @access  Private
const deleteLink = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    const link = await Link.findById(req.params.id);
    if (!link) {
      res.status(404);
      throw new Error("Link not found");
    }
    // Check that user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // Ensure logged in user matches link user
    if (link.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await Link.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: link.id });
  }
);

export default {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};
