import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { changePassword } from "../../api/user.api";
import { changePassword as changeStorePassword } from "../../api/store.api";

import type {
  ChangePasswordInput,
  ErrorResponse,
  MessageResponse,
} from "../../types/common.types";
import { useAuth } from "../../context/AuthContext";

export const useChangePassword = () => {
  const { user } = useAuth();

  return useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    ChangePasswordInput
  >({
    mutationFn: user?.role == "USER" ? changePassword : changeStorePassword,

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to change password");
        return;
      }

      toast.success(data.message || "Password updated successfully");
    },

    onError: (error) => {
      if (!error.response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.error(error.response.data.message || "Failed to change password");
    },
  });
};
