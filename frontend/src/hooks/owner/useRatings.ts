// hooks/owner/useRatings.ts

import { useQuery } from "@tanstack/react-query";
import type { RatingsResponse } from "../../types/store.types";
import { getRatings } from "../../api/store.api";

export const useRatings = () => {
  return useQuery<RatingsResponse>({
    queryKey: ["store-ratings"],
    queryFn: getRatings,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};
