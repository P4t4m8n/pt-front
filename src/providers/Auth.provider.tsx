import { useState, ReactNode, useEffect, useRef, FC } from "react";
import { TUser } from "../types/user.type";
import { authService } from "../service/auth.service";
import { AuthContext } from "../context/Auth.context";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<TUser | null>(null);

  //Access the state value without causing a re-render
  const userRef = useRef<TUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getSessionUser();
        setUser(user);
        userRef.current = user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const signOut = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      userRef.current = null;
    }
  };

  const signIn = async (formData: FormData) => {
    const user = await authService.signIn(formData);
    setUser(user);
  };
  const signUp = async (formData: FormData) => {
    const user = await authService.signUp(formData);
    setUser(user);
  };

  const getCurrentUserNoRender = () => userRef.current;

  return (
    <AuthContext.Provider
      value={{ user, signOut, getCurrentUserNoRender, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
