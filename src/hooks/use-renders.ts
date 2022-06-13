import { useState } from "react";
import { pluralize } from "../utils";

const renderPlural = pluralize("render");

export function useRenders() {
  const [count, setCount] = useState(1);

  const rerender = () => setCount((prev) => prev + 1);

  const renders = `${count} ${renderPlural(count)}`;

  return {
    renders,
    rerender,
  };
}
