"use client";
import { useState } from "react";
import { addUser } from "../utils/addUser.js";

export default function Admin({ organisations }) {
  const [selectedOrganisation, setSelectedOrganisation] = useState("");

  const handleChange = (e) => {
    setSelectedOrganisation(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await addUser(formData);
      alert("Gebruiker succesvol toegevoegd!");
    } catch (err) {
      alert("Fout bij toevoegen gebruiker");
      console.error(err);
    }
  }

  return (
    <div className="p-4  bg-[#f3f3f4] w-full ">
      <h1 className="text-xl text-gray-500 font-bold tracking-tight">
        Voeg een medewerker toe
      </h1>
      <form onSubmit={handleSubmit} className="flex items-center py-4">
        <div className="flex flex-col gap-11">
          <div className="flex gap-11 items-end">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-light">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="E-mailadres"
                className="admin-input-bar"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="mb-1 font-light">
                Functienaam
              </label>
              <select
                name="role"
                id="role"
                className="admin-input-bar max-w-[130px] bg-white"
              >
                <option value="manager">manager</option>
                <option value="medewerker">medewerker</option>
              </select>
            </div>
          </div>
          <div className="flex gap-11">
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-light">
                Wachtwoord
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="wachtwoord"
                className="admin-input-bar"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="organisation" className="mb-1 font-light">
                Organisatie
              </label>
              <select
                id="organisation"
                name="organisation"
                value={selectedOrganisation}
                onChange={handleChange}
                required
                className="admin-input-bar max-w-[130px] bg-white"
              >
                <option value="" disabled>
                  Selecteer een organisatie
                </option>
                {organisations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="relative left-[20%] max-w-[200px] flex flex-col gap-11">
          <button
            type="submit"
            className="shadow-lg font-bold bg-blue-200 hover:bg-blue-400 h-[50px] w-[200px]"
          >
            Toevoegen
          </button>
        </div>
      </form>
    </div>
  );
}
