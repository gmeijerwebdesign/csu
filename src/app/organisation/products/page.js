import { createClient } from "../../utils/supabase/server";

export default async function Products() {
  const supabase = await createClient(); // awaiten is nodig
  const { data: products } = await supabase
    .from("organisation_inventory")
    .select();

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
