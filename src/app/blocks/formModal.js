import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
export default function FormModal({ selectedTimeBox, setIsOpen, mode }) {
  const e = mode === "edit" ? selectedTimeBox?.entry : null;

  const [formData, setFormData] = useState({
    // product_id: 0,
    title: "",
    serialnumber: "",
    message: "",
    amount: 0,
  });
  useEffect(() => {
    if (mode === "edit" && e) {
      setFormData({
        // product_id: e.product_id,
        title: e.title || "",
        serialnumber: e.serialnumber || "",
        message: e.message || "",
        amount: e.amount || 0,
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        serialnumber: "",
        message: "",
        amount: 0,
      });
    }
  }, [e, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "edit") {
      const product_id = selectedTimeBox?.entry?.product_id;

      if (!product_id) {
        console.error("Geen product_id beschikbaar!");
        return;
      }

      const res = await fetch("/api/edit-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          ...formData,
        }),
      });
      console.log("Product ID:", product_id);

      if (!res.ok) {
        console.error("Fout bij bewerken:", await res.text());
      } else {
        console.log("Succesvol bewerkt!");
      }
    }

    // Sluit modal
    window.location.reload();
    setIsOpen(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-[400px] space-y-4">
      <div className="flex items-center justify-between mb-4">
        <FaArrowLeft
          className="text-2xl cursor-pointer text-gray-600 hover:text-black transition"
          onClick={() => setIsOpen(false)}
        />
        <h2 className="text-xl font-bold text-gray-700">
          {mode === "edit" ? "Bewerk product" : "Nieuw product"}
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="naam"
          >
            Naam
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="serienummer"
          >
            Serienummer
          </label>
          <input
            type="text"
            id="serialnumber"
            name="serialnumber"
            value={formData.serialnumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="opmerking"
          >
            Opmerking
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
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
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === "edit" ? "Opslaan" : "Toevoegen"}
        </button>
      </form>
    </div>
  );
}
