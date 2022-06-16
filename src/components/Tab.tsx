import {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import useLatestValue from "../hooks/use-latest-value";

interface TabContext {
  change: (index: number) => void;
  selectedIndex: number;
}

const TabContext = createContext<TabContext | null>(null);

interface GroupProps {
  children: ReactNode;
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

function Group({ children, defaultIndex = 0, onChange }: GroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const lastChangedIndex = useLatestValue(selectedIndex);

  const change = useCallback(
    (index: number) => {
      if (lastChangedIndex.current !== index) {
        onChange?.(index);
      }

      setSelectedIndex(index);
    },
    [onChange]
  );

  const value = { change, selectedIndex };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

function useTabContext() {
  const context = useContext(TabContext);

  if (context === null) {
    throw new Error("useTab must be used within a TabProvider");
  }

  return context;
}

function useTab(index: number) {
  const { change, selectedIndex } = useTabContext();

  const selected = index === selectedIndex;

  const handleClick = useCallback(() => {
    change(index);
  }, [change]);

  return { handleClick, selected };
}

export interface TabRenderProps {
  handleClick: () => void;
  selected: boolean;
}

interface TabProps {
  children: ReactNode | ((props: TabRenderProps) => ReactElement);
  // TODO: stop the consumer from providing this
  index?: number;
}

function Tab({ children, index }: TabProps) {
  const { handleClick, selected } = useTab(index!);

  return typeof children === "function" ? (
    children({ handleClick, selected })
  ) : (
    <button onClick={handleClick}>{children}</button>
  );
}

interface ListProps {
  children: ReactElement<TabProps, typeof Tab>[];
}

function List({ children }: ListProps) {
  return (
    <>
      {Children.map(children, (child, index) =>
        cloneElement(child, { ...child.props, index })
      )}
    </>
  );
}

interface PanelsProps {
  children: ReactElement<PanelProps, typeof Panel>[];
}

function Panels({ children }: PanelsProps) {
  const { selectedIndex } = useTabContext();

  return (
    <>
      {Children.map(children, (child, index) =>
        index === selectedIndex ? child : null
      )}
    </>
  );
}

interface PanelProps {
  children: ReactNode;
}

function Panel({ children }: PanelProps) {
  return <>{children}</>;
}

Tab.Group = Group;
Tab.List = List;
Tab.Panels = Panels;
Tab.Panel = Panel;

export default Tab;
