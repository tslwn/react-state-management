import clsx from "clsx";
import Example from "../components/Example";
import Tab, { TabRenderProps } from "../components/Tab";

export default function CompoundComponents() {
  return (
    <div className="space-y-4">
      <p>Also, compound components.</p>
      <Example>
        <Tab.Group
          onChange={(index) => {
            console.log("Changed selected tab to:", index);
          }}
        >
          <div className="mb-4 space-x-2">
            <Tab.List>
              <Tab>{renderTab("Tab 1")}</Tab>
              <Tab>{renderTab("Tab 2")}</Tab>
              <Tab>{renderTab("Tab 3")}</Tab>
            </Tab.List>
          </div>
          <div>
            <Tab.Panels>
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </Example>
    </div>
  );
}

function renderTab(label: string) {
  return function ({ handleClick, selected }: TabRenderProps) {
    return (
      <button
        className={clsx(selected && "font-semibold text-pink")}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  };
}
