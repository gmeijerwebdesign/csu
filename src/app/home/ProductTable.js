import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
const productsTest = [
  {
    product_id: "P001",
    naam: "Laptop",
    serienummer: "SN123456",
    opmerking: "Voorraadlaag",
    aantal: 3,
  },
  {
    product_id: "P002",
    naam: "Monitor",
    serienummer: "SN654321",
    opmerking: "Nieuw model",
    aantal: 10,
  },
];

export default function ProductTable({
  setSelectedTimeBox,
  setIsOpen,
  mode,
  setMode,
  products,
}) {
  return (
    <div>
      {/* {products.map((e, index) => {
        <p>{e.naam}</p>;
      })} */}
      {/* Tabel voor grotere schermen */}
      <div className="hidden md:block overflow-x-auto shadow-md ">
        <table className="min-w-full border border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-100">
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
            {/* product toevoegen */}
            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700" colSpan={5}></td>
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

            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.id}
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
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                    <FiEdit
                      size={20}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedTimeBox({
                          entry: product,
                          index: product.id,
                        });
                        setMode("edit");
                        setIsOpen(true);
                      }}
                    />
                  </button>
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
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
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
