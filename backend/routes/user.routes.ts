import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get users" });
});

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Create user" });
});

router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

export default router;
