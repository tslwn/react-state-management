import { useEffect, useRef } from "react";

export default function useLatestValue<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
