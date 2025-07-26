import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import MobileProductTable from "../components/mobileProductTable";

export default function ProductTable({
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
  const [openActionProductId, setOpenActionProductId] = useState(null);
  const actionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check bij mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Close action modal when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setOpenActionProductId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckBox = (product, checked) => {
    setCheckedRows((prev) => ({
      ...prev,
      [product]: checked,
    }));
  };
  useEffect(() => {
    console.log("✅ Geselecteerde rows:", checkedRows);
  }, [checkedRows]);

  return (
    <div>
      {isMobile ? (
        <MobileProductTable
          products={products}
          setSelectedTimeBox={setSelectedTimeBox}
          setIsOpen={setIsOpen}
          setMode={setMode}
          setProducts={setProducts}
          profile={profile}
          setGlow={setGlow}
          glow={glow}
          setIsOpenOrg={setIsOpenOrg}
          setSelectedProduct={setSelectedProduct}
        />
      ) : (
        <div
          className={`h-full  shadow-md rounded-lg border border-gray-200 ${
            glow ? "animate-glow" : ""
          }`}
        >
          <div className="overflow-visible max-h-full">
            <table className="min-w-full border border-gray-200 shadow rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <input type="checkbox" disabled />{" "}
                    {/* eventueel select all later */}
                  </th>
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
                {/* product toevoegen als director */}
                {isDirector && (
                  <tr className="border-t hover:bg-gray-50">
                    <td
                      className="px-4 py-2 text-sm text-gray-700"
                      colSpan={6}
                    ></td>
                    <td className="px-4 py-2 text-center text-green-700">
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
                    className={`border-t relative ${
                      glow ? "animate-glow" : ""
                    } hover:bg-gray-50`}
                  >
                    <td className="px-4 py-2 text-sm text-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={!!checkedRows[product.product_id]}
                        onChange={(e) =>
                          handleCheckBox(product.product_id, e.target.checked)
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
                              profile.organisation_id === 13
                                ? "-top-[125px]"
                                : "-top-[90px] right-11"
                            } bg-white border border-gray-200 rounded-md shadow-lg py-2 w-32 text-sm`}
                          >
                            <button
                              onClick={() => {
                                setSelectedTimeBox({
                                  entry: product,
                                  index: product.product_id,
                                });
                                setMode("edit");
                                setIsOpen(true);
                                setOpenActionProductId(null);
                              }}
                              className="w-full py-2 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                            >
                              <FiEdit className="inline mr-2" /> Bewerken
                            </button>
                            <button
                              onClick={() => handleDelete(product.product_id)}
                              className="w-full  py-2 flex items-center justify-center text-red-600 hover:bg-red-50"
                            >
                              <FaTrash className="inline mr-2" /> Verwijderen
                            </button>
                            {isDirector && (
                              <button
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setIsOpenOrg(true);
                                  setOpenActionProductId(null);
                                }}
                                className="w-full  py-2 flex items-center justify-center text-green-600 hover:bg-green-50"
                              >
                                <BiTransfer className="inline mr-2" />{" "}
                                Overdragen
                              </button>
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
      )}
    </div>
  );
}
