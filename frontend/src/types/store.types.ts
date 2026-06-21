export type Stats = {
  storeId: string;
  storeName: string;
  averageRating: string;
  totalRatings: number;
};

export type StoreDashboardResponse = {
  success: boolean;
  message: string;
  data: Stats;
};

export interface StoreRating {
  id: string;
  user: string;
  email: string;
  rating: number;
}

export interface RatingsResponse {
  success: boolean;
  message: string;
  data: StoreRating[];
}

export interface ProfileInput {
  name: string;
  email: string;
  address: string;
}

export interface ProfileInput {
  name: string;
  email: string;
  address: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
