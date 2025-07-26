// Filters.tsx
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

export default function Filters({
  amountOrder,
  onAmountSortToggle,
  messageOrder,
  onMessageSortToggle,
}) {
  const arrowStyle = "relative top-1/13";
  const arrowDown = <MdKeyboardArrowDown className={arrowStyle} />;
  const arrowUp = <IoIosArrowUp className={arrowStyle} size={13} />;

  const filterBoxStyle =
    "flex items-center text-gray-800 italic cursor-pointer";

  return (
    <div className="flex gap-4 p-1">
      <p className={filterBoxStyle} onClick={onAmountSortToggle}>
        amount {amountOrder === "asc" ? arrowDown : arrowUp}
      </p>
      <p className={filterBoxStyle} onClick={onMessageSortToggle}>
        message {messageOrder === "asc" ? arrowDown : arrowUp}
      </p>
    </div>
  );
}
