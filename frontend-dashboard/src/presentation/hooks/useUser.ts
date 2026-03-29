import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/infrastructure/api-client";
import { UserResponse } from "@/infrastructure/api/types.gen";
import { useAuthContext } from "@/presentation/store/AuthContext";

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
