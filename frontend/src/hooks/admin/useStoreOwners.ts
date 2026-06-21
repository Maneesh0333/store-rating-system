import { useQuery } from "@tanstack/react-query";
import { getStoreOwners } from "../../api/admin.api";
import type { StoreOwnersResponse } from "../../types/admin.types";

export const useStoreOwners = () => {
  return useQuery<StoreOwnersResponse>({
    queryKey: ["store-owners"],
    queryFn: getStoreOwners,
    staleTime: 1000 * 60 * 10,
    placeholderData: (previous) => previous,
  });
};
