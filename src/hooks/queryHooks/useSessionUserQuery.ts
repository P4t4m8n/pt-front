import { useQuery } from "@tanstack/react-query";
import { authService } from "../../service/auth.service";

export const useSessionUserQuery = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["session-user"],
    queryFn: () => authService.getSessionUser(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      // Only retry if it's not an auth or validation error
      const customError = error as { status?: number };
      if (customError.status === 401 || customError.status === 403)
        return false;
      return failureCount < 3;
    },
  
    
  });
  return { isPending, isError, user: data, error };
};
