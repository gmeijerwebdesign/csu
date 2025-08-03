"use client";

import { useState } from "react";

const dagen = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];

export default function Urenregistratie() {
  const [activeTab, setActiveTab] = useState("week");

  const [urenData, setUrenData] = useState(
    dagen.map((dag) => ({ dag, uren: "", project: "", opmerking: "" }))
  );

  const handleChange = (index, field, value) => {
    const newData = [...urenData];
    newData[index][field] = value;
    setUrenData(newData);
  };

  const maandStartDag = 5; // 0 = maandag, dus 5 = zaterdag
  const aantalDagen = 31;

  return (
    <div className="py-4">
      <div className="p-4 py-6 bg-white rounded-2xl shadow-md w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">urenregistratie</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          {["dag", "week", "maand"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-md text-[12px] font-medium ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Week-tab */}
        {activeTab === "week" && (
          <div className="space-y-4">
            {urenData.map((item, index) => (
              <div
                key={item.dag}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
              >
                <div className="font-medium text-sm">{item.dag}</div>
                <input
                  type="text"
                  placeholder="Project"
                  className="border rounded px-3 py-0 w-full"
                  value={item.project}
                  onChange={(e) =>
                    handleChange(index, "project", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Uren"
                  className="border rounded px-3 py-0 w-full"
                  value={item.uren}
                  onChange={(e) => handleChange(index, "uren", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Opmerking"
                  className="border rounded px-3 py-0 w-full"
                  value={item.opmerking}
                  onChange={(e) =>
                    handleChange(index, "opmerking", e.target.value)
                  }
                />
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
              Opslaan
            </button>
          </div>
        )}

        {/* Dag-tab */}
        {activeTab === "dag" && (
          <div className="space-y-4 space-x-4">
            <input
              type="date"
              className="border rounded px-3 py-2 w-1/8"
              placeholder="Datum"
            />
            <input
              type="number"
              className="border rounded px-3 py-2 w-1/8"
              placeholder="Uren"
            />
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              placeholder="Project"
            />

            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Opmerking"
              rows={2}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
              Opslaan
            </button>
          </div>
        )}
        {activeTab === "maand" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Maandoverzicht – Augustus 2025
            </h3>

            {/* Weekdagen header */}
            <div className="grid grid-cols-7 mb-2 text-center text-sm font-semibold text-gray-500">
              {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((dag) => (
                <div key={dag} className="uppercase tracking-wide">
                  {dag}
                </div>
              ))}
            </div>

            {/* Kalenderweergave */}
            <div className="grid grid-cols-7 gap-3 text-sm">
              {/* Lege vakjes vóór de 1e */}
              {Array.from({ length: maandStartDag }).map((_, i) => (
                <div
                  key={`leeg-${i}`}
                  className="flex flex-col bg-gray-100 border border-gray-200 rounded-2xl p-3 h-28 shadow-sm hover:shadow-md transition duration-150"
                />
              ))}

              {/* Dagblokjes */}
              {Array.from({ length: aantalDagen }, (_, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-gray-50 border border-gray-200 rounded-2xl p-3 h-28 shadow-sm hover:shadow-md transition duration-150"
                >
                  <div className="text-sm font-bold text-gray-700 mb-2">
                    {i + 1} aug
                  </div>

                  <input
                    type="number"
                    placeholder="Uren"
                    className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs mb-1 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                  <input
                    type="text"
                    placeholder="Project"
                    className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-blue-600 text-white font-medium px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">
                Opslaan maand
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
