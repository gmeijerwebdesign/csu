import React from "react";

export default function Footer() {
  const buttonClass =
    "text-sm bg-gray-200 text-blue-900 font-semibold px-4 py-3 shadow-md border border-gray-500 rounded-tr-[15px] cursor-pointer hover:bg-blue-400 hover:text-white";

  return (
    <div className="fixed inset-x-0 bottom-3 px-4 flex flex-wrap gap-4 justify-end border-t border-gray-100">
      <button className={buttonClass}>artikel invoeren</button>
      <button className={buttonClass}>selectie de(selecteren)</button>
      <button className={buttonClass}>reset filters</button>
      <button className={buttonClass}>afdrukken</button>
    </div>
  );
}
