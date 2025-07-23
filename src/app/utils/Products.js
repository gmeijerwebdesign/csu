import { createClient } from "./supabase/server.js";

export async function getProducts(profile) {
  const supabase = await createClient();

  const isCSU = profile?.organisation_id === 13;
  const table = isCSU ? "csu_inventory" : "organisation_inventory";

  let query = supabase.from(table).select().order("id", { ascending: true });

  // 👇 Alleen filteren op organisation_id als het GEEN CSU is
  if (!isCSU) {
    query = query.eq("organisation_id", profile.organisation_id);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return products || [];
}
