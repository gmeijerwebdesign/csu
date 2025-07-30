"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: authResult, error: loginError } =
    await supabase.auth.signInWithPassword(data);

  if (loginError || !authResult.session?.user) {
    redirect("/error");
  }

  const user = authResult.session.user;

  // Check of profiel bestaat
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  // Als profiel niet bestaat, maak aan
  if (profileError && profileError.code === "PGRST116") {
    await supabase.from("profiles").insert({
      id: user.id,
      organisation_id: 13,
      role: "user",
      email: data.email,
    });
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: signupResult, error } = await supabase.auth.signUp(data);

  if (error || !signupResult.user) {
    redirect("/error");
  }

  const user = signupResult.user;

  // Profiel aanmaken
  await supabase.from("profiles").insert({
    id: user.id,
    organisation_id: 2,
    role: "user",
  });

  revalidatePath("/", "layout");
  redirect("/");
}
