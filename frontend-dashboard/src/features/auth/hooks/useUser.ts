import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";
import { User } from "@/core/types/user";
import { useAuthContext } from "@/store/AuthContext";

export function useUser() {
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const { data } = await apiClient.get<User>("/auth/me");
      
      if (!data) {
        throw new Error("User data not found");
      }
      
      return data;
    },
    enabled: isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
