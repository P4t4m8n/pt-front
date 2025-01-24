import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined | null => {
  const ref = useRef<T | undefined | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
