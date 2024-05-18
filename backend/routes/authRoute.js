import express from "express";
import {
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

export default router;
