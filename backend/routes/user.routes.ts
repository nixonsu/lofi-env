import express from "express";
import controller from "../controllers/user.controller";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/me", protect, controller.getCurrentUser);
router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
