"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function HomeScreen({ data }) {
  const supabase = createClient();
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login"); // hier redirect je client-side
    }
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
