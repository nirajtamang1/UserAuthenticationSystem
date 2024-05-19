import express from "express";
import {
  deleteProfileController,
  forgetPasswordController,
  getProfileController,
  loginController,
  resetPasswordController,
  signUpController,
  updateProfileController,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/forgetPassword", forgetPasswordController);
router.post("/reset_password/:id/:token", resetPasswordController);
router.get("/profile", authMiddleware, getProfileController);
router.put("/profile", authMiddleware, updateProfileController);
router.delete("/profile", authMiddleware, deleteProfileController);

export default router;
