import type { Role } from "./common.types";

export type DashboardData = {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
};

export type DashboardResponse = {
  success: boolean;
  message?: string;
  data: DashboardData;
};

export type User = {
  name: string;
  email: string;
  address: string | null;
  role: Role;
  id: string;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  data: User[];
};

export type CreateUserInput = {
  name: string;
  email: string;
  address: string;
  password: string;
  role: "USER" | "ADMIN" | "STORE_OWNER";
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
};

export type Store = {
  id: string;
  name: string;
  email: string;
  address: string;
  owner: {
    id: string;
    name: string;
  };
  averageRating: number;
};

export type StoresResponse = {
  success: boolean;
  message: string;
  data: Store[];
};

export type CreateStoreInput = {
  name: string;
  email: string;
  address: string;
  ownerId: string;
};

export type CreateStoreResponse = {
  success: boolean;
  message: string;
};

export type StoreOwner = {
  id: string;
  name: string;
};

export type StoreOwnersResponse = {
  success: boolean;
  message: string;
  data: StoreOwner[];
};
