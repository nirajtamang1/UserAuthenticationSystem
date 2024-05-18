import express from "express";
import {
  deleteProfileController,
  getProfileController,
  loginController,
  signUpController,
  updateProfileController,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, getProfileController);
router.put("/profile", authMiddleware, updateProfileController);
router.delete("/profile", authMiddleware, deleteProfileController);

export default router;
