import { body, param } from "express-validator";

export const createRatingValidation = [
  body("storeId").notEmpty().withMessage("storeId is required"),
  body("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isNumeric()
    .withMessage("rating must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5 characters"),
];

export const updateRatingValidation = [
  param("storeId").notEmpty().withMessage("storeId is required"),
  body("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isNumeric()
    .withMessage("rating must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5 characters"),
];

