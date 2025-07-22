import { createClient } from "../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();

  const { organisation_id, product_id, amount } = await req.json();

  if (!organisation_id || !product_id || !amount || amount <= 0) {
    return new Response("Ongeldige invoer", { status: 400 });
  }

  // 1. Haal product op uit csu_inventory
  const { data: product, error: getError } = await supabase
    .from("csu_inventory")
    .select("*")
    .eq("product_id", product_id)
    .single();

  if (getError || !product) {
    return new Response("Product niet gevonden", { status: 404 });
  }

  if (product.amount < amount) {
    return new Response("Niet genoeg voorraad in CSU", { status: 400 });
  }

  // 2. Trek hoeveelheid af uit hoofdvoorraad
  const { error: updateError } = await supabase
    .from("csu_inventory")
    .update({ amount: product.amount - amount })
    .eq("product_id", product_id);

  if (updateError) {
    return new Response("Kon CSU voorraad niet bijwerken", { status: 500 });
  }

  // 3. Kijk of product al bestaat in organisation_inventory
  const { data: orgProduct, error: orgGetError } = await supabase
    .from("organisation_inventory")
    .select("*")
    .eq("product_id", product_id)
    .eq("organisation_id", organisation_id)
    .single();

  if (orgGetError && orgGetError.code !== "PGRST116") {
    return new Response("Fout bij ophalen organisatieproduct", { status: 500 });
  }

  if (orgProduct) {
    // Bestaat al, verhoog aantal
    const { error: orgUpdateError } = await supabase
      .from("organisation_inventory")
      .update({ amount: orgProduct.amount + amount })
      .eq("product_id", product_id)
      .eq("organisation_id", organisation_id);

    if (orgUpdateError) {
      return new Response("Kon organisatievoorraad niet bijwerken", {
        status: 500,
      });
    }
  } else {
    // Bestaat nog niet, maak nieuwe rij aan
    const { error: insertError } = await supabase
      .from("organisation_inventory")
      .insert([
        {
          product_id,
          organisation_id,
          amount,
          title: product.title,
          serialnumber: product.serialnumber,
          message: product.message,
        },
      ]);

    if (insertError) {
      return new Response("Kon organisatievoorraad niet toevoegen", {
        status: 500,
      });
    }
  }

  return new Response("Overdracht succesvol", { status: 200 });
}
