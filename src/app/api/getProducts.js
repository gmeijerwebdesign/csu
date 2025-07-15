import { createClient } from "../utils/supabase/server";

export default async function getProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("organisation_inventory")
    .select();

  if (error) {
    console.log(error);
    return [];
  }

  return data || [];
}
