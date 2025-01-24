import { createContext } from "react";
import { TUser } from "../types/user.type";

interface AuthProvider {
  user: TUser | null;
  signOut: () => Promise<void>;
  getCurrentUserNoRender: () => TUser | null;
  signIn: (formData: FormData) => Promise<void>;
  signUp: (formData: FormData) => Promise<void>;
}
export const AuthContext = createContext<AuthProvider | undefined>(undefined);
