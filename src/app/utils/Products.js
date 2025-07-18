import { createClient } from "./supabase/server.js";

export async function getProducts(profile) {
  const supabase = await createClient();

  const isCSU = profile?.organisation_id === 13;
  const table = isCSU ? "csu_inventory" : "organisation_inventory";

  const { data: products, error } = await supabase.from(table).select();

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return products || [];
}
