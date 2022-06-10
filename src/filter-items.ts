interface Item {
  id: string;
}

export const ITEMS: Item[] = [
  { id: "foo" },
  { id: "bar" },
  { id: "baz" },
  { id: "qux" },
  { id: "quux" },
  { id: "quuz" },
  { id: "corge" },
  { id: "grault" },
  { id: "garply" },
  { id: "waldo" },
  { id: "fred" },
];

interface State {
  filteredItems: Item[];
  items: Item[];
  query: string;
}

enum ActionType {
  ChangeQuery,
}

type Action = {
  type: ActionType.ChangeQuery;
  value: string;
};

export function changeQuery(value: string) {
  return {
    type: ActionType.ChangeQuery,
    value,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeQuery:
      return {
        ...state,
        query: action.value,
        filteredItems: state.items.filter((row) =>
          row.id.includes(action.value)
        ),
      };
  }
}

export const initialState: State = {
  items: ITEMS,
  query: "",
  filteredItems: ITEMS,
};
