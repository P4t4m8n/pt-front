import React, { useCallback, useMemo, useState } from "react";
import { TToast, TToastType } from "../types/app.type";
import ToastContainer from "../components/UI/Toast/Toast";
import { ToastContext } from "../context/ToastContext";
import { appUtil } from "../utils/app.util";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const addToast = useCallback((message: string, type: TToastType) => {
    const id = appUtil.generateRandomId();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
