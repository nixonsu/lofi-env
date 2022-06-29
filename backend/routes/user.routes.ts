import express from "express";
import controller from "../controllers/user.controller";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", verifyToken, controller.getCurrentUser);
router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);
router.put("/:id", verifyToken, controller.updateUser);
router.delete("/:id", verifyToken, controller.deleteUser);

export default router;
