import { body } from "express-validator";

export const createUserValidation = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("password").matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/),
  body("role").isIn(["ADMIN", "USER", "STORE_OWNER"]),
];

export const createStoreValidation = [
  body("name").notEmpty(),

  body("email").isEmail(),

  body("address")
    .isLength({ max: 400 }),

  body("ownerId").notEmpty(),
];