import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return {
    successToast: (message: string) => context.addToast(message, "success"),
    errorToast: (message: string) => context.addToast(message, "error"),
    warningToast: (message: string) => context.addToast(message, "warning"),
    infoToast: (message: string) => context.addToast(message, "info"),
  };
};
