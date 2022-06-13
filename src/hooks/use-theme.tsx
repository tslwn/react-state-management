import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export interface State {
  isDarkMode: boolean;
}

enum ActionType {
  ToggleTheme,
}

export type Action = {
  type: ActionType.ToggleTheme;
};

export function toggleTheme() {
  return {
    type: ActionType.ToggleTheme,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ToggleTheme:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
  }
}

export const initialState: State = {
  isDarkMode: false,
};

const ThemeContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
