import { useDebugValue, useMemo, useReducer, useRef, useState } from "react";

const ROWS = [
  "foo",
  "bar",
  "baz",
  "qux",
  "quux",
  "quuz",
  "corge",
  "grault",
  "garply",
  "waldo",
  "fred",
];

function useRows() {
  return ROWS;
}

const pluralize = (str: string) => (count: number) =>
  count === 1 ? str : str + "s";

const calls = pluralize("call");

const renders = pluralize("render");

export default function DerivedState() {
  const [count, setCount] = useState(1);

  const rows = useRows();

  return (
    <div className="space-y-4">
      <p>There are different ways to handle derived state.</p>
      <div>
        <button
          className="bg-pink hover:bg-pink/75 text-black px-4 py-2"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Re-render
        </button>
        <span className="ml-4">
          {count} {renders(count)}
        </span>
      </div>
      <p>
        In this example, the filtered rows are computed every time the component
        is rendered.
      </p>
      <div className="border-2 p-4 rounded-xl">
        <ComputeExample />
      </div>
      <p>
        If it were expensive to compute the filtered rows, it could be more
        efficient to memoize the result. For this to work, the <code>rows</code>{" "}
        object must be referentially equal between renders.
      </p>
      <div className="border-2 p-4 rounded-xl">
        <MemoizeExample />
      </div>
      <p>Alternatively, the filtered rows could also be kept in state.</p>
      <div className="border-2 p-4 rounded-xl">
        <CacheExample />
      </div>
    </div>
  );
}

function ComputeExample() {
  const [rows] = useState(ROWS);

  const [query, setQuery] = useState("");

  const count = useRef(0);

  count.current = count.current + 1;

  const filteredRows = rows.filter((row) => row.includes(query));

  return (
    <>
      <input
        className="block mb-2"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter"
        value={query}
      />
      <ul className="bg-gray-50 h-24 mb-2 overflow-y-auto">
        {filteredRows.map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
      <span>
        {count.current} {calls(count.current)} to filter rows
      </span>
    </>
  );
}

function MemoizeExample() {
  const [rows] = useState(ROWS);

  const [query, setQuery] = useState("");

  const count = useRef(0);

  const filteredRows = useMemo(() => {
    count.current = count.current + 1;

    return rows.filter((row) => row.includes(query));
  }, [query, rows]);

  return (
    <>
      <input
        className="block mb-2"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter"
        value={query}
      />
      <ul className="bg-gray-50 h-24 mb-2 overflow-y-auto">
        {filteredRows.map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
      <span>
        {count.current} {calls(count.current)} to filter rows
      </span>
    </>
  );
}

interface CacheExampleState {
  rows: string[];
  query: string;
  filteredRows: string[];
}

enum CacheExampleActionType {
  ChangeQuery,
}

type CacheExampleAction = {
  type: CacheExampleActionType.ChangeQuery;
  value: string;
};

function cacheExampleReducer(
  state: CacheExampleState,
  action: CacheExampleAction
): CacheExampleState {
  switch (action.type) {
    case CacheExampleActionType.ChangeQuery:
      return {
        ...state,
        query: action.value,
        filteredRows: state.rows.filter((row) => row.includes(action.value)),
      };
  }
}

const cacheExampleInitialState: CacheExampleState = {
  rows: ROWS,
  query: "",
  filteredRows: ROWS,
};

function CacheExample() {
  const [state, dispatch] = useReducer(
    cacheExampleReducer,
    cacheExampleInitialState
  );

  const count = useRef(0);

  return (
    <>
      <input
        className="block mb-2"
        onChange={(event) => {
          count.current = count.current + 1;

          dispatch({
            type: CacheExampleActionType.ChangeQuery,
            value: event.target.value,
          });
        }}
        placeholder="Filter"
        value={state.query}
      />
      <ul className="bg-gray-50 h-24 mb-2 overflow-y-auto">
        {state.filteredRows.map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
      <span>
        {count.current} {calls(count.current)} to filter rows
      </span>
    </>
  );
}
