import clsx from "clsx";
import { useState } from "react";
import DerivedState from "./pages/DerivedState";
import Lifetimes from "./pages/Lifetimes";

type Page = "home" | "lifetimes" | "derived-state";

const pages = [
  {
    id: "home",
    label: "Home",
    contents: <Home />,
  },
  {
    id: "lifetimes",
    label: "Lifetimes",
    contents: <Lifetimes />,
  },
  {
    id: "derived-state",
    label: "Derived State",
    contents: <DerivedState />,
  },
] as const;

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");

  return (
    <div>
      <div className="p-4 sticky top-0">
        <h1 className="font-extrabold text-xl">React state management demo</h1>
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto px-4">
          <nav className="fixed right-auto w-64">
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <a
                    className={clsx(
                      page.id === activePage && "font-semibold text-pink"
                    )}
                    href="#"
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pl-64">
            <main className="mx-auto relative">
              {pages.find((page) => page.id === activePage)?.contents}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return <div>TODO</div>;
}
