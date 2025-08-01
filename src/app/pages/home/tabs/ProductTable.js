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
  products = [],
  setSelectedProduct,
  profile,
  glow,
  handleDelete,
  checkedRows = {},
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
        <table className="min-w-full border-collapse ">
          <thead className="bg-[#ebf1ff]">
            <tr>
              <th className="px-4 py-2 border border-gray-200">
                <input type="checkbox" disabled aria-label="select all" />
              </th>
              {[
                "Status",
                "Artikelnummer",
                "Omschrijving",
                "Categorie",
                "Merk",
                "Serienummer",
                "Opmerking",
                "Voorraad",
                "Bestelstatus",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border border-gray-200"
                >
                  {head}
                </th>
              ))}
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 border border-gray-200">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {isDirector && (
              <tr className="hover:bg-gray-50">
                <td
                  colSpan={10}
                  className="px-4 text-sm border border-gray-200"
                ></td>
                <td className="px-4  text-center text-green-700 border border-gray-200">
                  <FaPlus
                    className="cursor-pointer inline-block"
                    aria-label="Toevoegen"
                    onClick={() => {
                      setSelectedTimeBox(null);
                      setMode("add");
                      setIsOpen(true);
                    }}
                  />
                </td>
                {/* vullen zodat kolom-aantal klopt */}
                <td className="hidden" />
                <td className="hidden" />
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product.product_id}
                className={`hover:bg-gray-50 ${glow ? "animate-glow" : ""}`}
              >
                <td className="px-4 py-2 text-center border border-gray-200">
                  <input
                    type="checkbox"
                    aria-label={`Selecteer ${product.title}`}
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
                {/* status */}
                <td className="px-4 py-2 text-sm text-green-600 border border-gray-200">
                  actief
                </td>
                {/* artikelnummer */}
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  AA-ZW-WD50E
                </td>
                {/* product naam */}
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {product.title}
                </td>
                {/* categorie */}
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  Schoonmaakspullen
                </td>
                {/* merk */}
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  AEG
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {product.serialnumber}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {product.message}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {product.amount}
                </td>
                <td className="px-4 py-2 text-sm text-green-600 border border-gray-200">
                  Bestellen
                </td>
                <td className="px-4 py-2 text-center relative border border-gray-200">
                  <div className="flex justify-center relative">
                    <BsThreeDots
                      className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
                      aria-label="Acties"
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
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-6 text-center text-sm text-gray-500 border border-gray-200"
                >
                  Geen producten gevonden.
                </td>
              </tr>
            )}
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
      className={`w-full py-2 flex items-center justify-center text-left ${color}`}
    >
      {icon} <span className="ml-1">{label}</span>
    </button>
  );
}
