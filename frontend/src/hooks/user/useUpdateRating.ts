import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { updateRating } from "../../api/user.api";

import type { ErrorResponse } from "../../types/common.types";
import type { RatingInput, RatingResponse } from "../../types/user.types";

export const useUpdateRating = () => {
  const queryClient = useQueryClient();

  return useMutation<RatingResponse, AxiosError<ErrorResponse>, RatingInput>({
    mutationFn: updateRating,

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to update rating");
        return;
      }

      toast.success(data.message || "Rating updated");

      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },

    onError: (error) => {
      if (!error.response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.error(error.response.data.message || "Failed to update rating");
    },
  });
};
