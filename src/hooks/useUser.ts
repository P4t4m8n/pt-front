import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
