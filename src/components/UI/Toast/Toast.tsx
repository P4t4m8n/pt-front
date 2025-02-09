import { useEffect, useRef, useState } from "react";
import { eventBus, SHOW_MSG } from "../../../utils/toastEmitter.util";

export default function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  const [animation, setAnimation] = useState<"slideOut" | "slideIn" | "">("");
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = eventBus.on(SHOW_MSG, (msg: string) => {
      console.log("msg:", msg)
      setMsg(msg);
      setAnimation("slideIn");
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      timeoutIdRef.current = setTimeout(closeMsg, 200000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const closeMsg = () => {
    setAnimation("slideOut");
    setTimeout(() => {
      setMsg(null);
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

  return (
    <section onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`${animation} `}>
        <p>{msg}</p>
      </div>
    </section>
  );
}
