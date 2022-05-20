import express from "express";
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import {
  register,
  login,
  addShowToFavorites,
  removeShowFromFavorites,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = express.Router();
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/addShowToFavorites").patch(authenticateUser, addShowToFavorites);
router
  .route("/removeShowFromFavorites")
  .patch(authenticateUser, removeShowFromFavorites);

export default router;
