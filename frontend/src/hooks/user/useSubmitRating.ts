import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { submitRating } from "../../api/user.api";


import type { ErrorResponse } from "../../types/common.types";
import type { RatingInput, RatingResponse } from "../../types/user.types";

export const useSubmitRating = () => {
  const queryClient = useQueryClient();

  return useMutation<RatingResponse, AxiosError<ErrorResponse>, RatingInput>({
    mutationFn: submitRating,

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to submit rating");
        return;
      }

      toast.success(data.message || "Rating submitted");

      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },

    onError: (error) => {
      if (!error.response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.error(error.response.data.message || "Failed to submit rating");
    },
  });
};
