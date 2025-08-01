import React from "react";
import { BiTransfer } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function MobileProductTable({
  setSelectedTimeBox,
  setIsOpen,
  setIsOpenOrg,
  setMode,
  products,
  setSelectedProduct,
  profile,
  handleDelete,
}) {
  const isDirector = profile?.organisation_id === 13;

  return (
    <div className="md:hidden space-y-4 mt-4">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="border productform border-gray-200 rounded-lg p-4 shadow-sm"
        >
          {[
            ["Product ID", product.product_id],
            ["Naam", product.title],
            ["Serienummer", product.serialnumber],
            ["Opmerking", product.message],
            ["Aantal", product.amount],
          ].map(([label, value]) => (
            <div className="mb-2" key={label}>
              <span className="font-semibold text-gray-600">{label}:</span>{" "}
              {value}
            </div>
          ))}

          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="text-blue-500 hover:text-blue-700 transition"
              onClick={() => {
                setSelectedTimeBox({
                  entry: product,
                  index: product.product_id,
                });
                setMode("edit");
                setIsOpen(true);
              }}
            >
              <FiEdit size={20} />
            </button>
            {isDirector && (
              <button
                className="text-green-500 hover:text-green-700 transition"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsOpenOrg(true);
                }}
              >
                <BiTransfer size={20} />
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700 transition"
              onClick={() => handleDelete(product.product_id)}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
