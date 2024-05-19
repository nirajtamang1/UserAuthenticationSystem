import express from "express";
import {
  allUserController,
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

router.get("/userProfiles", allUserController);

export default router;
