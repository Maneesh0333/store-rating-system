import type { Role } from "./common.types";

export interface RegisterInput {
  name: string;
  email: string;
  address: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export interface ToggleContextType {
  toggle: boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
