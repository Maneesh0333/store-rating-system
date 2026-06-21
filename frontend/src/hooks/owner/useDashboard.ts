import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/common.types";
import type { StoreDashboardResponse } from "../../types/store.types";
import { getStoreDashboard } from "../../api/store.api";

export const useDashboard = () => {
  return useQuery<StoreDashboardResponse, AxiosError<ErrorResponse>>({
    queryKey: ["store-dashboard"],
    queryFn: getStoreDashboard,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};