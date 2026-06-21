import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { createUser } from "../../api/admin.api";


import type {
  CreateUserInput,
  CreateUserResponse,
} from "../../types/admin.types";
import type { ErrorResponse } from "../../types/common.types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateUserResponse,
    AxiosError<ErrorResponse>,
    CreateUserInput
  >({
    mutationFn: createUser,

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to create user");
        return;
      }

      toast.success(data.message || "User created successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      if (!error.response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.error(error.response.data.message || "Failed to create user");
    },
  });
};