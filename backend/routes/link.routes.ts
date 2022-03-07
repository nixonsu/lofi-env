import express from "express";
import controller from "../controllers/link.controller";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, controller.getLinks);
router.post("/", protect, controller.createLink);
router.put("/:id", protect, controller.updateLink);
router.delete("/:id", protect, controller.deleteLink);

export default router;
