import express from "express";
import controller from "../controllers/task.controller";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, controller.getTasks);
router.post("/", protect, controller.createTask);
router.put("/:id", protect, controller.updateTask);
router.delete("/:id", protect, controller.deleteTask);

export default router;
