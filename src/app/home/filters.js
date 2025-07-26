// Filters.tsx
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
export default function Filters({
  amountOrder,
  onAmountSortToggle,
  productTitleOrder,
  setProductTitleOrder,
  onTitleSortSubmit,
}) {
  const arrowStyle = "relative top-1/13";
  const arrowDown = <MdKeyboardArrowDown className={arrowStyle} />;
  const arrowUp = <IoIosArrowUp className={arrowStyle} size={13} />;

  const filterBoxStyle =
    "flex items-center text-gray-800 italic cursor-pointer";

  return (
    <div className="flex gap-4 p-1 py-4">
      <p className={filterBoxStyle} onClick={onAmountSortToggle}>
        amount {amountOrder === "asc" ? arrowDown : arrowUp}
      </p>
      <form className="flex" onSubmit={onTitleSortSubmit}>
        <input
          type="text"
          placeholder="zoeken..."
          className="searchbar"
          value={productTitleOrder}
          onChange={(e) => setProductTitleOrder(e.target.value)}
        />
        <div className="bg-white h-[35px] w-[30px] flex items-center justify-center ">
          <button type="submit">
            <MdOutlineSearch size={23} />
          </button>
        </div>
      </form>
    </div>
  );
}
