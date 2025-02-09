//Core
import { ReactNode, FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
//Services
import { authService } from "../service/auth.service";
//Context
import { AuthContext } from "../context/Auth.context";
//Hooks
import { useSessionUserQuery } from "../hooks/queryHooks/useSessionUserQuery";
/**
 * Props for the AuthProvider component.
 */
interface Props {
  /**
   * Child elements to render inside the provider.
   */
  children: React.ReactNode;
}
/**
 * AuthProvider component that supplies authentication context to its children.
 */
export const AuthProvider: FC<Props> = ({
  children,
}: {
  children: ReactNode;
}) => {
  /**
   * Fetches the current user session from the server.
   */
  const { user } = useSessionUserQuery();
  /**
   * Query client instance used to invalidate queries
   */
  const queryClient = useQueryClient();
  /**
   * Signs out the current user and invalidates the session query.
   */
  const signOut = async () => {
    try {
      await authService.signOut();
      queryClient.invalidateQueries({ queryKey: ["session-user"] });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  /**
   * Authenticates a user using the provided form data.
   * Error handled in the component that calls this function.
   * @param formData - Form fields used for sign-in.
   */
  const signIn = async (formData: FormData) => {
    const user = await authService.signIn(formData);
    queryClient.setQueryData(["session-user"], () => user);
  };
  /**
   * Registers a new user using the provided form data.
   * Error handled in the component that calls this function.
   * @param formData - Form fields used for sign-up.
   */
  const signUp = async (formData: FormData) => {
    const user = await authService.signUp(formData);
    queryClient.setQueryData(["session-user"], () => user);
  };
  /**
   * Provides the authentication context to its children.
   */
  return (
    <AuthContext.Provider value={{ user, signOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
