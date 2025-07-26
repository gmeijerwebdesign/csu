// utils/Products.js
import { createClient } from "./supabase/client";

export async function getProducts(profile, filters = {}) {
  const supabase = await createClient();

  const isCSU = profile?.organisation_id === 13;
  const table = isCSU ? "csu_inventory" : "organisation_inventory";

  let query = supabase.from(table).select();

  if (!isCSU) {
    query = query.eq("organisation_id", profile.organisation_id);
  }

  // 🔽 Sorteer op filters
  if (filters.amountOrder) {
    query = query.order("amount", { ascending: filters.amountOrder === "asc" });
  } else {
    query = query.order("id", { ascending: true }); // fallback
  }

  // eventueel extra sorting op "message" kolom
  if (filters.messageOrder) {
    query = query.order("message", {
      ascending: filters.messageOrder === "asc",
    });
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return products || [];
}
