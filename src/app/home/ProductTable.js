import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { useState } from "react";

export default function ProductTable({
  setSelectedTimeBox,
  setIsOpen,
  setMode,
  products,
  setProducts,
  profile,
  glow,
  setGlow,
}) {
  const handleDelete = async (product_id) => {
    if (!product_id) {
      console.error("Geen product_id beschikbaar!");
      return;
    }

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

    console.log("Succesvol verwijderd");

    // ✅ verwijder uit lijst
    setProducts((prev) =>
      prev.filter((product) => product.product_id !== product_id)
    );
    setGlow(true);
    setTimeout(() => setGlow(false), 2000);
  };

  const isDirector =
    profile?.role === "manager" || profile?.organisation_id === 13;
  return (
    <div>
      {/* Tabel voor grotere schermen */}
      <div
        className={`hidden md:block overflow-x-auto shadow-md ${glow} ? "animate-glow" : ""`}
      >
        <table className="min-w-full border border-gray-200 shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Product ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Naam
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Serienummer
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Opmerking
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Aantal
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {/* product toevoegen als manager */}
            {isDirector ? (
              <tr className="border-t hover:bg-gray-50">
                <td
                  className="px-4 py-2 text-sm text-gray-700"
                  colSpan={5}
                ></td>
                <td className="px-4 py-2 text-center text-green-700">
                  <FaPlus
                    className="cursor-pointer inline-block"
                    onClick={() => {
                      setSelectedTimeBox(null); // Geen geselecteerd product
                      setMode("add");
                      setIsOpen(true);
                    }}
                  />
                </td>
              </tr>
            ) : null}

            {products.map((product) => (
              <tr
                key={product.product_id}
                className={`border-t ${
                  glow ? "animate-glow" : ""
                } hover:bg-gray-50`}
              >
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
                <td className="px-4 py-2 text-center ">
                  <button className="p-1 text-blue-500 hover:text-blue-700 transition duration-200">
                    <FiEdit
                      size={15}
                      className="cursor-pointer "
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
                  <button className="text-red-500 hover:text-red-700 transition duration-200">
                    <FaTrash
                      size={15}
                      className="cursor-pointer"
                      onClick={() => handleDelete(product.product_id)}
                    />
                  </button>
                  {isDirector ? (
                    <button className=" hover:text-green-700 transition duration-200">
                      <BiTransfer size={15} className="cursor-pointer" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kaarten voor mobiele schermen */}
      <div className="md:hidden space-y-4">
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
            <div className="flex justify-end">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
