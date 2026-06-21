import express from "express";
import {
  dashboardController,
  createUserController,
  createStoreController,
  getUsersController,
  getUserByIdController,
  getStoresController,
  getStoreOwnersController,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// router.use(authMiddleware);
// router.use(authorize("ADMIN"));

router.get("/dashboard", dashboardController);

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.get("/users/:id", getUserByIdController);

router.post("/stores", createStoreController);
router.get("/stores", getStoresController);
router.get("/store-owners", getStoreOwnersController);

export default router;
