import { createContext } from "react";
import { TToastType } from "../types/app.type";

interface ToastContextType {
  addToast: (message: string, type: TToastType) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
