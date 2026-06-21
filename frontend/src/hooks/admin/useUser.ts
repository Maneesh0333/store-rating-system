import { useQuery } from "@tanstack/react-query";
import type { UsersResponse } from "../../types/admin.types";
import { getUsers } from "../../api/admin.api";
import type { Role } from "../../types/common.types";

export const useUsers = (search: string, role: Role | "All") => {
  return useQuery<UsersResponse>({
    queryKey: ["users", search, role],
    queryFn: ()=>getUsers(search, role),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previous) => previous,
  });
};