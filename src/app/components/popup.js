import React from "react";

export default function Popup({ setIsOpenPopup, handleDelete }) {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Weet je het zeker?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Deze actie kan niet ongedaan worden gemaakt.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpenPopup(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Annuleren
          </button>
          <button
            onClick={() => {
              handleDelete();
              setIsOpenPopup(false);
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  );
}
