import { createClient } from "../../../utils/supabase/server";
export async function getMessage(profile) {
  const supabase = await createClient();

  let query = supabase
    .from("notifications")
    .select()
    .eq("organisation_id", profile.organisation_id);

  const { data: notifications, error } = await query;

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return notifications || [];
}
