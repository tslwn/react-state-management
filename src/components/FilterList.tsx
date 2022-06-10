import React, { ChangeEvent, ReactNode } from "react";

type Id = number | string;

interface Item<T extends Id> {
  id: T;
}

interface FilterListProps<T extends Id, U extends Item<T>> {
  items: U[];
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
  renderItem?: (item: U) => ReactNode;
}

export default function FilterList<T extends Id, U extends Item<T>>({
  items,
  onChangeQuery,
  query,
  renderItem = (item) => item.id,
}: FilterListProps<T, U>) {
  return (
    <>
      <input
        className="block mb-2"
        onChange={onChangeQuery}
        placeholder="Filter"
        value={query}
      />
      <ul className="bg-gray-50 h-24 mb-2 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </>
  );
}
