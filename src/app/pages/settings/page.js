"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage("Fout bij wijzigen wachtwoord: " + error.message);
    } else {
      setMessage("Wachtwoord succesvol gewijzigd.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="py-4 font-bold text-xl text-slate-800">Instellingen</h1>
      </div>
      <form onSubmit={handlePasswordChange}>
        <label className="block mb-2 font-medium">Nieuw wachtwoord</label>
        <input
          type="password"
          className=" border p-2 rounded mb-4 border-r-0 "
          value={password}
          placeholder="wachtwoord"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Bezig..." : "Wachtwoord wijzigen"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
