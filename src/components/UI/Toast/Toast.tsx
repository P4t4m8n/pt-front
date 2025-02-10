import { useEffect, useRef, useState } from "react";
import { eventBus, SHOW_MSG } from "../../../utils/toastEmitter.util";
import { TToast } from "../../../types/app.type";
import Button from "../Button";
import { icons } from "../Icons/App.icons";

export default function Toast() {
  const [toast, setToast] = useState<TToast | null>(null);
  const [animation, setAnimation] = useState<
    "animate-slideOut" | "animate-slideIn" | ""
  >("");
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = eventBus.on(SHOW_MSG, (toast: TToast) => {
      setToast(toast);
      setAnimation("animate-slideIn");
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const closeMsg = () => {
    setAnimation("animate-slideOut");
    setTimeout(() => {
      setToast(null);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(closeMsg, 2000);
  };

  const stylesStatus = {
    success: " bg-green-500 text-white ",
    error: " bg-red-500 text-white",
    warning: " bg-yellow-500 text-white",
    info: " bg-blue-500 text-white",
    default: "",
  };

  const style = `${
    stylesStatus[toast?.type || "default"]
  } ${animation} fixed bottom-18 right-2 w-60 h-fit p-2 rounded-md font-semibold text-center flex gap-1 items-start`;

  if (!toast) return null;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={style}
    >
      <Button onClick={closeMsg} styleMode="none" styleSize="none">
        {icons.PlusSvg({ className: "w-8 h-8 rotate-45 stroke-black" })}
      </Button>
      {toast?.message}
    </div>
  );
}
