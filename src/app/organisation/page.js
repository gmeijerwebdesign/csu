import React from "react";

export default function Organization({ profile }) {
  const isDirector =
    profile?.role === "manager" || profile?.organisation_id === 13;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="py-4 font-bold text-xl text-slate-800">
          Organiesatiebeheer
        </h1>
        {isDirector ? (
          <button className="text-blue-800 bg-gray-200">
            organiesatie toevoegen
          </button>
        ) : null}
      </div>
    </div>
  );
}
