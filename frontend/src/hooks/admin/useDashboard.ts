import { useQuery } from "@tanstack/react-query";
import type { DashboardResponse } from "../../types/admin.types";
import { getDashboard } from "../../api/admin.api";

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previous) => previous,
  });
};