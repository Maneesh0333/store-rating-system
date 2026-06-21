import type {
  ChangePasswordInput,
  MessageResponse,
  ProfileResponse,
  UpdateProfileInput,
} from "../types/common.types";
import type { RatingsResponse, StoreDashboardResponse } from "../types/store.types";

import api from "./axios";

export const getStoreDashboard = async (): Promise<StoreDashboardResponse> => {
  const response = await api.get("/store-owner/dashboard");
  return response.data;
};

export const getRatings = async (): Promise<RatingsResponse> => {
  const response = await api.get("/store-owner/ratings");
  return response.data;
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const { data } = await api.get("/store-owner/profile");
  return data;
};

export const updateProfile = async (
  payload: UpdateProfileInput,
): Promise<ProfileResponse> => {
  const { data } = await api.put("/store-owner/profile", payload);
  return data;
};

export const changePassword = async (
  payload: ChangePasswordInput,
): Promise<MessageResponse> => {
  const { data } = await api.put("/store-owner/change-password", payload);
  return data;
};
