import express from "express";
import controller from "../controllers/color.controller";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, controller.getColors);
router.put("/:id", verifyToken, controller.updateColor);

export default router;
