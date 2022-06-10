import clsx from "clsx";
import { ReactNode } from "react";

type Id = number | string;

export interface Tab<T extends Id> {
  id: T;
  label: string;
  contents: ReactNode;
}

interface TabsProps<T extends Id> {
  active: T;
  onClick: (id: T) => void;
  tabs: Tab<T>[];
}

export default function Tabs<T extends Id>({
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
