import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getPrifile } from "../../api/user.api";

import type { ErrorResponse } from "../../types/common.types";
import type { ProfileResponse } from "../../types/user.types";

export const useProfile = () => {
  return useQuery<ProfileResponse, AxiosError<ErrorResponse>>({
    queryKey: ["profile", ],
    queryFn: getPrifile,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};