import type {
  CreateStoreInput,
  CreateStoreResponse,
  CreateUserInput,
  CreateUserResponse,
  DashboardResponse,
  StoreOwnersResponse,
  StoresResponse,
  UsersResponse,
} from "../types/admin.types";
import type { Role } from "../types/common.types";
import api from "./axios";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getUsers = async (
  search: string,
  role: Role | "All",
): Promise<UsersResponse> => {
  const response = await api.get("/admin/users", {
    params: { search, role },
  });
  return response.data;
};

export const createUser = async (
  data: CreateUserInput,
): Promise<CreateUserResponse> => {
  const response = await api.post("/admin/users", data);
  return response.data;
};

export const getStores = async (search: string): Promise<StoresResponse> => {
  const response = await api.get("/admin/stores", {
    params: { search },
  });

  return response.data;
};

export const createStore = async (
  data: CreateStoreInput,
): Promise<CreateStoreResponse> => {
  const response = await api.post("/admin/stores", data);

  return response.data;
};

export const getStoreOwners = async (): Promise<StoreOwnersResponse> => {
  const response = await api.get("/admin/store-owners");
  return response.data;
};