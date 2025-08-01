import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import MobileProductTable from "./mobileProductTable";

export default function ProductTable({
  setSelectedTimeBox,
  setIsOpen,
  setIsOpenOrg,
  setMode,
  products,
  setSelectedProduct,
  profile,
  glow,
  handleDelete,
  checkedRows,
  setCheckedRows,
}) {
  const [openActionProductId, setOpenActionProductId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const actionRef = useRef(null);

  const isDirector = profile?.organisation_id === 13;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setOpenActionProductId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckBox = (product_id, organisation_id, checked) => {
    setCheckedRows((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[product_id] = { product_id, organisation_id };
      } else {
        delete updated[product_id];
      }
      return updated;
    });
  };

  if (isMobile) {
    return (
      <MobileProductTable
        {...{
          setSelectedTimeBox,
          setIsOpen,
          setIsOpenOrg,
          setMode,
          products,
          setSelectedProduct,
          profile,
          handleDelete,
        }}
      />
    );
  }

  return (
    <div
      className={`shadow-md rounded-lg border border-gray-200 ${
        glow ? "animate-glow" : ""
      }`}
    >
      <div className="overflow-visible">
        <table className="min-w-full border border-gray-200 shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" disabled />
              </th>
              {["Product ID", "Naam", "Serienummer", "Opmerking", "Aantal"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                  >
                    {head}
                  </th>
                )
              )}
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {isDirector && (
              <tr className="border-t hover:bg-gray-50">
                <td colSpan={6} className="px-4 py-2 text-sm"></td>
                <td className="text-center text-green-700">
                  <FaPlus
                    className="cursor-pointer inline-block"
                    onClick={() => {
                      setSelectedTimeBox(null);
                      setMode("add");
                      setIsOpen(true);
                    }}
                  />
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product.product_id}
                className={`border-t hover:bg-gray-50 ${
                  glow ? "animate-glow" : ""
                }`}
              >
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[product.product_id]}
                    onChange={(e) =>
                      handleCheckBox(
                        product.product_id,
                        product.organisation_id,
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.product_id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.serialnumber}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.message}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.amount}
                </td>
                <td className="px-4 py-2 text-center relative">
                  <div className="flex justify-center relative">
                    <BsThreeDots
                      className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
                      onClick={() =>
                        setOpenActionProductId((prev) =>
                          prev === product.product_id
                            ? null
                            : product.product_id
                        )
                      }
                    />
                    {openActionProductId === product.product_id && (
                      <div
                        ref={actionRef}
                        className={`absolute z-[9999] ${
                          isDirector ? "-top-[125px]" : "-top-[90px]"
                        } right-11 bg-white border border-gray-200 rounded-md shadow-lg py-2 w-32 text-sm`}
                      >
                        <ActionButton
                          icon={<FiEdit className="inline mr-2" />}
                          label="Bewerken"
                          onClick={() => {
                            setSelectedTimeBox({
                              entry: product,
                              index: product.product_id,
                            });
                            setMode("edit");
                            setIsOpen(true);
                            setOpenActionProductId(null);
                          }}
                          color="text-blue-600 hover:bg-blue-50"
                        />
                        <ActionButton
                          icon={<FaTrash className="inline mr-2" />}
                          label="Verwijderen"
                          onClick={() => handleDelete(product.product_id)}
                          color="text-red-600 hover:bg-red-50"
                        />
                        {isDirector && (
                          <ActionButton
                            icon={<BiTransfer className="inline mr-2" />}
                            label="Overdragen"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsOpenOrg(true);
                              setOpenActionProductId(null);
                            }}
                            color="text-green-600 hover:bg-green-50"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 flex items-center justify-center ${color}`}
    >
      {icon} {label}
    </button>
  );
}
