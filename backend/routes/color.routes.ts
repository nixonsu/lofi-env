import express from "express";
import controller from "../controllers/color.controller";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, controller.getColors);
router.put("/:id", protect, controller.updateColor);

export default router;
