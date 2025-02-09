import { TToast } from "../../../types/app.type";

interface Props {
  toast: TToast;
  onRemove: () => void;
}

export default function ToastItem({ toast, onRemove }: Props) {
  const baseStyles =
    "rounded-lg p-4 min-w-[300px] max-w-[600px] shadow-lg flex justify-between items-center text-white";

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[toast.type]} animate-slideIn`}>
      <p>{toast.message}</p>
      <button
        onClick={onRemove}
        className="ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
}
