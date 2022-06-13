import clsx from "clsx";
import { Dispatch, ReactNode, useReducer } from "react";
import Button from "../components/Button";
import Example from "../components/Example";
import { useCounter } from "../hooks/use-counter";
import {
  Action,
  initialState,
  reducer,
  State,
  ThemeProvider,
  toggleTheme,
  useTheme,
} from "../hooks/use-theme";

export default function Context() {
  return (
    <div className="space-y-4">
      <p>
        There are two situations in which the Context API is particularly
        useful.
      </p>
      <p>
        Firstly, a piece of state may be referenced by many components in a
        sub-tree, which may be deeply nested. Without Context, the state must be
        passed through each in-between component via props. This situation is
        commonly referred to as "prop-drilling".
      </p>
      <Example>
        <PropsSubtree />
      </Example>
      <p>
        In some situations, the number of components through which a piece of
        state is passed can be reduced by composing components differently.
      </p>
      <Example>
        <CompositionSubtree />
      </Example>
      <p>
        If the sub-tree is wrapped by a context provider, the components which
        reference the piece of state can access it directly.
      </p>
      <Example>
        <ThemeProvider>
          <ContextSubtree />
        </ThemeProvider>
      </Example>
      <p>Compound components</p>
    </div>
  );
}

interface ToggleProps {
  dispatch: Dispatch<Action>;
  state: State;
}

function Toggle({ dispatch, state }: ToggleProps) {
  return (
    <div>
      <Button onClick={() => dispatch(toggleTheme())}>Toggle theme</Button>
      <span className="ml-4">{state.isDarkMode ? "Dark" : "Light"}</span>
    </div>
  );
}

interface InbetweenProps {
  children: ReactNode;
}

const Inbetween = ({ children }: InbetweenProps) => <div>{children}</div>;

interface ThemeProps {
  isDarkMode: boolean;
}

const Nested = ({ isDarkMode }: ThemeProps) => (
  <div className={clsx("p-2", isDarkMode && "bg-slate-900 text-white")}>
    This component is deeply nested.
  </div>
);

const PropsInbetweenA = ({ isDarkMode }: ThemeProps) => (
  <PropsInbetweenB isDarkMode={isDarkMode} />
);

const PropsInbetweenB = ({ isDarkMode }: ThemeProps) => (
  <PropsInbetweenC isDarkMode={isDarkMode} />
);

const PropsInbetweenC = ({ isDarkMode }: ThemeProps) => (
  <Nested isDarkMode={isDarkMode} />
);

function PropsSubtree() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="space-y-4">
      <Toggle dispatch={dispatch} state={state} />
      <PropsInbetweenA isDarkMode={state.isDarkMode} />
    </div>
  );
}

function CompositionSubtree() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="space-y-4">
      <Toggle dispatch={dispatch} state={state} />
      <Inbetween>
        <Inbetween>
          <Inbetween>
            <Nested isDarkMode={state.isDarkMode} />
          </Inbetween>
        </Inbetween>
      </Inbetween>
    </div>
  );
}

function ContextSubtree() {
  const { dispatch, state } = useTheme();

  return (
    <div className="space-y-4">
      <Toggle dispatch={dispatch} state={state} />
      <Inbetween>
        <Inbetween>
          <Inbetween>
            <ContextNested />
          </Inbetween>
        </Inbetween>
      </Inbetween>
    </div>
  );
}

const ContextNested = () => {
  const { state } = useTheme();

  return <Nested isDarkMode={state.isDarkMode} />;
};
