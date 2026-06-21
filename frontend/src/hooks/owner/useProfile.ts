import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { ErrorResponse, ProfileResponse } from "../../types/common.types";
import { getProfile } from "../../api/store.api";

export const useProfile = () => {
  return useQuery<ProfileResponse, AxiosError<ErrorResponse>>({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};
