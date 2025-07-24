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
    <div className="p-0 bg-[#f3f3f4] w-full">
      <h1 className="text-xl text-gray-500 font-bold tracking-tight mb-4">
        Voeg een medewerker toe
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          <div className="flex flex-col w-full md:w-[calc(50%-1rem)]">
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

          <div className="flex flex-col w-full md:w-[calc(50%-1rem)]">
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

          <div className="flex flex-col w-full md:w-[calc(50%-1rem)]">
            <label htmlFor="role" className="mb-1 font-light">
              Functienaam
            </label>
            <select name="role" id="role" className="admin-input-bar bg-white">
              <option value="manager">manager</option>
              <option value="medewerker">medewerker</option>
            </select>
          </div>

          <div className="flex flex-col w-full md:w-[calc(50%-1rem)]">
            <label htmlFor="organisation" className="mb-1 font-light">
              Organisatie
            </label>
            <select
              id="organisation"
              name="organisation"
              value={selectedOrganisation}
              onChange={handleChange}
              required
              className="admin-input-bar bg-white"
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

        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            className="shadow-lg font-bold bg-blue-200 hover:gradient h-[50px] w-full md:w-[200px]"
          >
            Toevoegen
          </button>
        </div>
      </form>
    </div>
  );
}
