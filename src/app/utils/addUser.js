// app/actions/addUser.js
"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

export async function addUser(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  const organisation_id = formData.get("organisation");

  const { data: signupResult, error: signupError } = await supabase.auth.signUp(
    {
      email,
      password,
      options: {
    
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    }
  );

  if (signupError || !signupResult.user) {
    console.error("Signup error:", signupError);
    throw new Error("Kan gebruiker niet aanmaken");
  }

  const user = signupResult.user;

  // Profiel toevoegen
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    email,
    role,
    organisation_id: parseInt(organisation_id),
  });

  if (profileError) {
    console.error("Profile insert error:", profileError);
    throw new Error("Kan profiel niet aanmaken");
  }

  revalidatePath("/admin"); 
}
