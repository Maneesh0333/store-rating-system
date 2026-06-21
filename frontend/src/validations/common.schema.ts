import * as yup from "yup";

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Current password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot exceed 16 characters"),
});

export const updateProfileSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),

  address: yup
    .string()
    .trim()
    .required("Address is required")
    .max(400, "Address cannot exceed 400 characters"),
});
