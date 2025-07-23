import { createClient } from "../../../utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID ontbreekt" }), {
      status: 400,
    });
  }

  const { error } = await supabase.from("notifications").delete().eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
  });
}
