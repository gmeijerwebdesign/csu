import React from "react";
import { CiGrid41 } from "react-icons/ci"; // voorbeeld icoon, pas aan als je wilt
import { BiArchive } from "react-icons/bi";

const defaultTabs = [
  { key: "inventaris", label: "Inventaris", Icon: CiGrid41 },
  { key: "medewerkerkaart", label: "Medewerkers", Icon: BiArchive },
  // voeg hier extra tabs toe als je ze nodig hebt
];

export default function HomeNav({
  tabs = defaultTabs,
  currentTab,
  setCurrentTab,
  rightAction, // optioneel: JSX voor een knop rechts
}) {
  return (
    <nav
      aria-label="Hoofd navigatie"
      className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4"
    >
      <div className="flex overflow-x-auto gap-2 scrollbar-hide">
        {tabs.map(({ key, label, Icon }) => {
          const active = key === currentTab;
          return (
            <button
              key={key}
              onClick={() => setCurrentTab(key)}
              className={`
                flex items-center gap-1 whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium
                transition
                ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
                focus:outline-none focus:bg-gray-100
              `}
              aria-current={active ? "page" : undefined}
            >
              {Icon && <Icon size={16} />}
              {label}
            </button>
          );
        })}
      </div>
      {rightAction && (
        <div className="ml-auto flex items-center">{rightAction}</div>
      )}
    </nav>
  );
}
