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
  setProducts,
  setSelectedProduct,
  profile,
  glow,
  setGlow,
}) {
  const handleDelete = async (product_id) => {
    if (!product_id) return console.error("Geen product_id beschikbaar!");

    const res = await fetch("/api/delete-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id,
        organisation_id: profile.organisation_id,
      }),
    });

    if (!res.ok) {
      console.error("Fout:", await res.text());
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.product_id !== product_id)
    );
    setGlow(true);
    setTimeout(() => setGlow(false), 2000);
  };
  const isDirector = profile?.organisation_id === 13;
  return (
    <div>
      {" "}
      {/* Mobiele weergave */}
      <div className="md:hidden space-y-4 mt-4">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border productform border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Product ID:</span>{" "}
              {product.product_id}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Naam:</span>{" "}
              {product.title}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Serienummer:</span>{" "}
              {product.serialnumber}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Opmerking:</span>{" "}
              {product.message}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Aantal:</span>{" "}
              {product.amount}
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                <FiEdit
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTimeBox({
                      entry: product,
                      index: product.product_id,
                    });
                    setMode("edit");
                    setIsOpen(true);
                  }}
                />
              </button>
              {isDirector && (
                <button className="text-green-500 hover:text-green-700 transition duration-200">
                  <BiTransfer
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsOpenOrg(true);
                    }}
                  />
                </button>
              )}
              <button className="text-red-500 hover:text-red-700 transition duration-200">
                <FaTrash
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleDelete(product.product_id)}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
