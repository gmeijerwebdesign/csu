// app/api/add-product/route.js

import { createClient } from "../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const body = await req.json();

  const { title, serialnumber, message, amount, organisation_id } = body;

  const messageToInsert = message?.trim() === "" ? "n.v.t" : message;

  const isCSU = organisation_id === 13;
  const table = isCSU ? "csu_inventory" : "organisation_inventory";
  console.log(body);

  const { data, error } = await supabase
    .from(table)
    .insert({
      title,
      serialnumber,
      message: messageToInsert,
      amount,
      organisation_id,
    })
    .select();

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
