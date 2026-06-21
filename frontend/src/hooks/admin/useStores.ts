import { useQuery } from "@tanstack/react-query";
import { getStores } from "../../api/admin.api";

export const useStores = (search: string) => {
  return useQuery({
    queryKey: ["stores", search],
    queryFn: () => getStores(search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previous) => previous,
  });
};