import express from "express";
import controller from "../controllers/user.controller";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/me", controller.getCurrentUser);
router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
