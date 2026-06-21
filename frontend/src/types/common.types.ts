export type Role = "ADMIN" | "USER" | "STORE_OWNER";

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateProfileInput = {
  name: string;
  address: string;
};

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile;
}
