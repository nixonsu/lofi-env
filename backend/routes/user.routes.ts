import express from "express";
import controller from "../controllers/user.controller";
import { verifyToken, protectUserId } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", verifyToken, controller.getCurrentUser);
router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);
router.put("/:id", verifyToken, protectUserId, controller.updateUser);
router.delete("/:id", verifyToken, protectUserId, controller.deleteUser);

export default router;
