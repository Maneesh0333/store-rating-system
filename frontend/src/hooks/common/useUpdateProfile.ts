import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { updateProfile } from "../../api/user.api";
import { updateProfile as updateStoreProfile } from "../../api/store.api";

import type {
  ErrorResponse,
  MessageResponse,
  UpdateProfileInput,
} from "../../types/common.types";

import { useAuth } from "../../context/AuthContext";

export const useUpdateProfile = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    UpdateProfileInput
  >({
    mutationFn: user?.role == "USER" ? updateProfile : updateStoreProfile,

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success(data.message || "Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error) => {
      if (!error.response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.error(error.response.data.message || "Failed to update profile");
    },
  });
};
