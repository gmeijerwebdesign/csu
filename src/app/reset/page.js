"use client";
import { useEffect } from "react";
import { createClient } from "../utils/supabase/client";

export default function ResetPage() {
  const supabase = createClient();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          const newPassword = prompt("Wat wil je nieuwe wachtwoord zijn?");
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (data) {
            alert("Wachtwoord succesvol bijgewerkt!");
            window.location.href = "/login"; // optioneel redirect
          }

          if (error) {
            alert("Er ging iets mis: " + error.message);
          }
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="p-8">
      <h1>Wachtwoord resetten</h1>
      <p>Even geduld... of ververs de pagina als je niks ziet.</p>
    </div>
  );
}
