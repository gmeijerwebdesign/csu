import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function OrganisationModal({
  setIsOpenOrg,
  organisations,
  selectedProduct,
}) {
  const [selectedOrganisation, setSelectedOrganisation] = useState("");
  const [orgList, setOrgList] = useState(organisations || []);

  const [amount, setAmount] = useState(1); // default = 1

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleChange = (e) => {
    setSelectedOrganisation(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOrganisation || !amount) return;

    const res = await fetch("/api/transfer-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organisation_id: selectedOrganisation,
        product_id: selectedProduct.product_id,
        amount,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Transfer mislukt:", errText);
      return;
    }
    window.location.reload();
    setIsOpenOrg(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-[400px] space-y-4">
      <div className="flex items-center justify-between mb-4">
        <FaArrowLeft
          className="text-2xl cursor-pointer text-gray-600 hover:text-black transition"
          onClick={() => setIsOpenOrg(false)}
        />
        <h2 className="text-xl font-bold text-gray-700">
          Selecteer organisatie
        </h2>
      </div>

      <form className="space-y-4 " onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="organisation"
            className="block text-gray-700 font-semibold mb-1"
          >
            Organisatie
          </label>
          <select
            id="organisation"
            name="organisation"
            value={selectedOrganisation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="" disabled>
              Selecteer een organisatie
            </option>
            {orgList.map((org) => (
              <option key={org.id} value={org.id}>
                {org.title}
              </option>
            ))}
          </select>

          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="aantal"
          >
            Aantal
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            max={selectedProduct.amount}
            className="w-1/4 border border-gray-300 rounded px-3 py-2"
            min={1}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Bevestigen
        </button>
      </form>
    </div>
  );
}
