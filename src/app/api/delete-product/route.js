// app/api/edit-product/route.js

import { createClient } from "../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const body = await req.json();

  const { product_id } = body;

  const { error } = await supabase
    .from("organisation_inventory")
    .delete()
    .eq("product_id", Number(product_id));

  if (error) {
    console.error("Supabase update error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
  });
}
