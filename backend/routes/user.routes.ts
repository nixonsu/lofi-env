import express from "express";
import controller from "../controllers/user.controller";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", protect, controller.getCurrentUser);
router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);
router.put("/:id", protect, controller.updateUser);
router.delete("/:id", protect, controller.deleteUser);

export default router;
