import React, { useState } from "react";

export default function Organization({ profile, organisations }) {
  const [formData, setFormData] = useState({
    title: "",
  });
  const [orgList, setOrgList] = useState(organisations || []);

  const isDirector =
    profile?.role === "manager" || profile?.organisation_id === 13;
  console.log(organisations);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let endpoint = "/api/create-organisation";
    let payload = { ...formData };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Fout:", await res.text());
      return;
    }

    if (res.ok) {
      const newOrg = await res.json();
      setOrgList((prev) => [...prev, newOrg]);
      setFormData({ title: "" });
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="py-4 font-bold text-xl text-slate-800">
          Organiesatiebeheer
        </h1>
      </div>
      <div>
        {orgList.map((e, key) => (
          <p key={key}>{e.title}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          className="bg-blue-100 p-2"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <button
          type="submit"
          className="bg-gray-900 text-white font-medium px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Organisatie toevoegen
        </button>
      </form>
    </div>
  );
}
