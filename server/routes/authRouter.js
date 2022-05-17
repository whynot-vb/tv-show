import express from "express";

import {
  register,
  login,
  addShowToFavorites,
  removeShowFromFavorites,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/addShowToFavorites").patch(authenticateUser, addShowToFavorites);
router
  .route("/removeShowFromFavorites")
  .patch(authenticateUser, removeShowFromFavorites);

export default router;
