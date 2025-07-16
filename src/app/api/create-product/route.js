// app/api/edit-product/route.js

import { createClient } from "../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const body = await req.json();

  const { title, serialnumber, message, amount } = body;

  const { data, error } = await supabase
    .from("organisation_inventory")
    .insert([{ title, serialnumber, message, amount }])
    .select(); // retourneert nieuw item

  if (error) {
    console.error("Supabase update error:", error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }

  if (!data || data.length === 0) {
    return new Response(JSON.stringify({ error: "Product niet gevonden" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Success", data }), {
    status: 200,
  });
}
