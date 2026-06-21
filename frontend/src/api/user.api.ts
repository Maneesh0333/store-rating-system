import type { ChangePasswordInput, ProfileResponse, UpdateProfileInput } from "../types/common.types";
import type { RatingInput, RatingResponse, StoresResponse } from "../types/user.types";
import api from "./axios";

export const getStores = async (search: string): Promise<StoresResponse> => {
  const response = await api.get("/user/stores", {
    params: { search },
  });
  return response.data;
};

export const submitRating = async (
  data: RatingInput,
): Promise<RatingResponse> => {
  const response = await api.post("/user/ratings", data);

  return response.data;
};

export const getPrifile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const updateRating = async (
  data: RatingInput,
): Promise<RatingResponse> => {
  const response = await api.put("/user/ratings", data);

  return response.data;
};

export const updateProfile = async (values: UpdateProfileInput) => {
  const { data } = await api.put("/user/profile", values);
  return data;
};

export const changePassword = async (values: ChangePasswordInput) => {
  const { data } = await api.put("/user/change-password", values);
  return data;
};
