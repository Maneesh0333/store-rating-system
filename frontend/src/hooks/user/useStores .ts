import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getStores } from "../../api/user.api";

import type { ErrorResponse } from "../../types/common.types";
import type { StoresResponse } from "../../types/user.types";

export const useStores = (search: string) => {
  return useQuery<StoresResponse, AxiosError<ErrorResponse>>({
    queryKey: ["stores", search],
    queryFn: () => getStores(search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};
