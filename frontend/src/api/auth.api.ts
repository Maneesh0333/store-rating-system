import api from "./axios";
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "../types/auth.types";

export const registerUser = async (
  data: RegisterInput,
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
