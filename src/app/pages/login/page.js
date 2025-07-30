"use client";
import { login } from "./actions";
import { createClient } from "../../utils/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Vul je e-mailadres in om een reset te ontvangen.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    });

    if (error) {
      alert("Er ging iets mis: " + error.message);
    } else {
      alert("Reset-link verzonden! Check je e-mail.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/unnamed.png" className="max-w-[200px]" />
      <div className="flex flex-col items-center py-5 text-[#595959]">
        <p className="bold tracking-wider">CSU | Scherp op schoon</p>
        <p>inlogscherm</p>
      </div>

      <form className="flex flex-col gap-4 items-center w-full max-w-xs">
        <input
          id="email"
          name="email"
          type="email"
          className="auth-input-bar"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!isResetMode && (
          <>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input-bar"
              placeholder="wachtwoord"
              required
            />

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-[14px] font-medium text-[#403c3c]">
                aangemeld blijven
              </span>
            </label>
          </>
        )}

        <p
          className="text-[12px] text-blue-700 cursor-pointer"
          onClick={() => setIsResetMode(!isResetMode)}
        >
          {isResetMode ? "Toch inloggen?" : "Wachtwoord vergeten?"}
        </p>

        {!isResetMode ? (
          <button className="custom-button" formAction={login}>
            Log in
          </button>
        ) : (
          <button
            type="button"
            className="custom-button"
            onClick={handleForgotPassword}
          >
            Reset-link sturen
          </button>
        )}
      </form>
    </div>
  );
}
