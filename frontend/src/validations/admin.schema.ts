import * as yup from "yup";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

export const userSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters")
    .max(60, "Maximum 60 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),

  address: yup
    .string()
    .trim()
    .required("Address is required")
    .max(400, "Address cannot exceed 400 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot exceed 16 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase letter and 1 special character",
    ),

  role: yup
    .string()
    .oneOf(["ADMIN", "USER", "STORE_OWNER"], "Select a Role")
    .required("Role is required"),
});

export const storeSchema = yup.object({
  name: yup
    .string()
    .required("Store name is required")
    .min(3)
    .max(60),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email"),

  address: yup
    .string()
    .required("Address is required")
    .max(400),

  ownerId: yup
    .string()
    .required("Store owner is required"),
});