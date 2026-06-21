import express from "express";
import {
  changePasswordController,
  getProfileController,
  getStoresController,
  submitRatingController,
  updateProfileController,
  updateRatingController,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(authorize("USER"));

router.get("/stores", getStoresController);
router.post("/ratings", submitRatingController);
router.put("/ratings", updateRatingController);

router.get("/profile", getProfileController);
router.put("/profile", updateProfileController);
router.put("/change-password", changePasswordController);

export default router;
