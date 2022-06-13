import { useRef } from "react";

export function useCounter() {
  const count = useRef(0);

  const increment = () => {
    count.current = count.current + 1;
  };

  return {
    count: count.current,
    increment,
  };
}
