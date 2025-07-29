
import { createClient } from "../../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const body = await req.json();

  const { title, message, organisation_id } = body;

  const { data, error } = await supabase
    .from("notifications")
    .insert({ title, message, organisation_id })
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
