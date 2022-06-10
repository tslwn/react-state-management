import clsx from "clsx";
import { HTMLAttributes } from "react";

export default function Button({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-pink hover:bg-pink/75 text-black px-4 py-2",
        className
      )}
    >
      {children}
    </button>
  );
}
