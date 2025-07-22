// app/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import MainLayout from "./components/MainLayout";
import { getProducts } from "./utils/Products.js";

export default async function Main() {
  const supabase = await createClient();

  // 🔐 Haal de ingelogde gebruiker op
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // 🧑‍💼 Haal profiel op
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, organisations(title, is_hoofd)")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("Profiel niet gevonden:", profileError);
    redirect("/login"); // of een foutpagina
  }

  // ✅ Geef profile door aan getProducts
  const products = await getProducts(profile);

  return <MainLayout user={user} profile={profile} products={products || []} />;
}
