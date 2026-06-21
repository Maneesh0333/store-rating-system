export type Store = {
  id: string;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating: number | null;
};

export type StoresResponse = {
  success: boolean;
  data: Store[];
};

export type RatingInput = {
  storeId: string;
  rating: number;
};

export type RatingResponse = {
  success: boolean;
  message: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
};