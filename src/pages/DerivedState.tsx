import { useMemo, useReducer, useState } from "react";
import Button from "../components/Button";
import Example from "../components/Example";
import FilterList from "../components/FilterList";
import { changeQuery, initialState, ITEMS, reducer } from "../filter-items";
import { useCounter } from "../hooks/use-counter";
import { useRenders } from "../hooks/use-renders";
import { pluralize } from "../utils";

const calls = pluralize("call");

export default function DerivedState() {
  const { renders, rerender } = useRenders();

  return (
    <div className="space-y-4">
      <p>There are different ways to handle derived state.</p>
      <div>
        <Button onClick={rerender}>Re-render</Button>
        <span className="ml-4">{renders}</span>
      </div>
      <p>
        In this example, the filtered items are computed every time the
        component is rendered.
      </p>
      <Example>
        <Compute />
      </Example>
      <p>
        If it were expensive to compute the filtered items, it could be more
        efficient to memoize the result. For this to work, the{" "}
        <code>items</code> object must be referentially equal between renders.
      </p>
      <Example>
        <Memoize />
      </Example>
      <p>Alternatively, the filtered items could also be kept in state.</p>
      <Example>
        <Cache />
      </Example>
    </div>
  );
}

function Compute() {
  const { count, increment } = useCounter();

  const [items] = useState(ITEMS);

  const [query, setQuery] = useState("");

  increment();
  const filteredItems = items.filter((item) => item.id.includes(query));

  return (
    <>
      <FilterList
        items={filteredItems}
        onChangeQuery={(event) => setQuery(event.target.value)}
        query={query}
      />
      <span>
        {count} {calls(count)} to filter items
      </span>
    </>
  );
}

function Memoize() {
  const { count, increment } = useCounter();

  const [items] = useState(ITEMS);

  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    increment();
    return items.filter((row) => row.id.includes(query));
  }, [query, items]);

  return (
    <>
      <FilterList
        items={filteredItems}
        onChangeQuery={(event) => setQuery(event.target.value)}
        query={query}
      />
      <span>
        {count} {calls(count)} to filter items
      </span>
    </>
  );
}

function Cache() {
  const { count, increment } = useCounter();

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <FilterList
        items={state.filteredItems}
        onChangeQuery={(event) => {
          increment();
          dispatch(changeQuery(event.target.value));
        }}
        query={state.query}
      />
      <span>
        {count} {calls(count)} to filter items
      </span>
    </>
  );
}
