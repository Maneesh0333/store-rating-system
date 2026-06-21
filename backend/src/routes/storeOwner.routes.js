import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  changeStorePasswordController,
  getDashboard,
  getStoreProfileController,
  getStoreRatingController,
  updateStoreProfileController,
} from "../controllers/storeOwner.controller.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(authorize("STORE_OWNER"));

router.get("/dashboard", getDashboard);
router.get("/ratings", getStoreRatingController);
router.get("/profile", getStoreProfileController);
router.put("/profile", updateStoreProfileController);
router.put("/change-password", changeStorePasswordController);

export default router;
