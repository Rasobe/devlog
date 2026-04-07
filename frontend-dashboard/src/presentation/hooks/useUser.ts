import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/infrastructure/http-client";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { User } from "@/core/types/user";

export function useUser() {
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const { data } = await apiClient.instance.get<User>("/auth/me")
      
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
