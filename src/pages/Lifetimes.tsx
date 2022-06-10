import { Dispatch, useReducer, useState } from "react";
import Example from "../components/Example";
import Tabs, { Tab } from "../components/Tabs";

type TabId = "app" | "local";

interface State {
  input: string;
  activeTab: TabId;
}

enum ActionType {
  ChangeInput,
  SetActiveTab,
}

type Action =
  | { type: ActionType.ChangeInput; value: string }
  | { type: ActionType.SetActiveTab; id: TabId };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeInput:
      return { ...state, input: action.value };
    case ActionType.SetActiveTab:
      return { ...state, activeTab: action.id };
  }
}

const initialState: State = { input: "", activeTab: "app" };

export default function Lifetimes() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tabs: Tab<TabId>[] = [
    {
      id: "app",
      label: "App state",
      contents: <InputApp dispatch={dispatch} input={state.input} />,
    },
    {
      id: "local",
      label: "Local state",
      contents: <InputLocal />,
    },
  ];

  return (
    <div className="space-y-4">
      <p>
        Typically, where to keep state is determined by its desired lifetime. If
        a piece of state only needs to live as long as a sub-tree, it can be
        local to the root component of that sub-tree.
      </p>
      <p>
        Take the <code>Tabs</code> component below, which only renders the
        active tab. When the active tab changes, the old active tab's contents
        are unmounted. If a piece of state was local to those contents, it is
        lost.
      </p>
      <Example>
        <Tabs
          onClick={(tabId: TabId) =>
            dispatch({ type: ActionType.SetActiveTab, id: tabId })
          }
          active={state.activeTab}
          tabs={tabs}
        />
      </Example>
    </div>
  );
}

interface InputAppProps {
  dispatch: Dispatch<Action>;
  input: string;
}

function InputApp({ dispatch, input }: InputAppProps) {
  return (
    <>
      <p className="mb-4">
        This input's value is held above the tab's contents, so it is preserved
        when those contents unmount.
      </p>
      <input
        className="block"
        onChange={(event) =>
          dispatch({ type: ActionType.ChangeInput, value: event.target.value })
        }
        placeholder="Placeholder"
        value={input}
      />
    </>
  );
}

function InputLocal() {
  const [input, setInput] = useState("");

  return (
    <>
      <p className="mb-4">
        This input's value is local to the component, so it is lost when the
        component unmounts.
      </p>
      <input
        className="block"
        onChange={(event) => setInput(event.target.value)}
        placeholder="Placeholder"
        value={input}
      />
    </>
  );
}
