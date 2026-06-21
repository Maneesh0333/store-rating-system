import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";

import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerController);
router.post("/login", loginValidation, validate, loginController);

export default router;
