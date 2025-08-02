// app/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import MainLayout from "./MainLayout";
import { getOrganisation } from "./utils/Organisations";
import { getMessage } from "./api/message/receive-message/route";

export default async function Main() {
  const supabase = await createClient();

  // 🔐 Haal de ingelogde gebruiker op
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/pages/login");
  }

  // 🧑‍💼 Haal profiel op
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, organisations(title, is_hoofd)")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("Profiel niet gevonden:", profileError);
    redirect("/pages/login"); // of een foutpagina
  }

  // Haal alle profielen op met dezelfde organisation_id
  const { data: teamProfiles, error: teamError } = await supabase
    .from("profiles")
    .select("id, role, organisation_id, email")
    .eq("organisation_id", profile.organisation_id);

  if (teamError) {
    console.error("Fout bij ophalen van teamprofielen:", teamError);
    return (
      <div className="p-6">
        <p>Er is een fout opgetreden bij het ophalen van gebruikers.</p>
      </div>
    );
  }
  const isAuth = profile.organisation_id === 13 || profile.role === "manager";

  const notifications = await getMessage(profile);
  const organisations = await getOrganisation();

  return (
    <MainLayout
      user={user}
      profile={profile}
      teamProfiles={teamProfiles}
      organisations={organisations || []}
      notifications={notifications}
      isAuth={isAuth}
    />
  );
}
