import clsx from "clsx";
import { ReactNode } from "react";

export interface Tab<T> {
  id: T;
  label: string;
  contents: ReactNode;
}

interface TabsProps<T> {
  active: T;
  onClick: (id: T) => void;
  tabs: Tab<T>[];
}

export default function Tabs<T extends string>({
  active,
  onClick,
  tabs,
}: TabsProps<T>) {
  return (
    <>
      <div className="mb-4 space-x-2">
        {tabs.map((tab) => (
          <button
            className={clsx(tab.id === active && "font-semibold text-pink")}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === active)?.contents}</div>
    </>
  );
}
