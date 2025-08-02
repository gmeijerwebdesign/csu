import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function UserFilters({
  amountOrder,
  toggleAmountSort,
  productTitleOrder,
  setProductTitleOrder,
  handleTitleSortSubmit,
  checkedRows,
  setIsOpenPopup,
  currentTab,
}) {
  const arrowStyle = "relative top-1/13";
  const arrowDown = <MdKeyboardArrowDown className={arrowStyle} />;
  const arrowUp = <IoIosArrowUp className={arrowStyle} size={13} />;

  const filterBoxStyle =
    "flex items-center text-gray-800 italic cursor-pointer";

  return (
    <div className="flex gap-6 p-1 py-4 items-center  ">
      {/* status */}
      <div className="flex flex-col w-48">
        <label className="text-xs font-bold text-blue-900 mb-1">actief</label>
        <select className="border border-gray-300 text-gray-600 text-sm px-2 py-1 shadow-sm">
          <option>&lt;Alle&gt;</option>
        </select>
      </div>
      {/* afdeling */}
      <div className="flex flex-col w-48">
        <label className="text-xs font-bold text-blue-900 mb-1">afdeling</label>
        <select className="border border-gray-300 text-gray-600 text-sm px-2 py-1 shadow-sm">
          <option>&lt;Alle&gt;</option>
        </select>
      </div>
      {/* functienaam */}
      <div className="flex flex-col w-48">
        <label className="text-xs font-bold text-blue-900 mb-1">
          functienaam
        </label>
        <select className="border border-gray-300 text-gray-600 text-sm px-2 py-1 shadow-sm">
          <option>&lt;Alle&gt;</option>
        </select>
      </div>

      <div className=" pt-4">
        {/* naam filter */}
        <form className="flex" onSubmit={handleTitleSortSubmit}>
          <input
            type="text"
            placeholder="zoeken..."
            className="searchbar"
            value={productTitleOrder}
            onChange={(e) => setProductTitleOrder(e.target.value)}
          />
          <div className="bg-white h-[35px] w-[30px] flex items-center justify-center">
            <button type="submit">
              <MdOutlineSearch size={23} />
            </button>
          </div>
        </form>
        {Object.keys(checkedRows).length > 0 && (
          <div className="pt-2">
            <FaTrash
              className="text-red-500 cursor-pointer "
              onClick={() => setIsOpenPopup(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
