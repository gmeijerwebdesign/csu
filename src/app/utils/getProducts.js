import { createClient } from "./supabase/server";

export async function getProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("organisation_inventory")
    .select();

  if (!products) {
    console.log("Error fetching data");
    return [];
  }

  return products || [];
}
