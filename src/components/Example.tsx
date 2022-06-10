import React, { ReactNode } from "react";

interface ExampleProps {
  children: ReactNode;
}

export default function Example({ children }: ExampleProps) {
  return <div className="border-2 p-4 rounded-xl">{children}</div>;
}
