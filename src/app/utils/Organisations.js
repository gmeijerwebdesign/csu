import { createClient } from "./supabase/server.js";

export async function getOrganisation() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organisations")
    .select()
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return data || [];
}
