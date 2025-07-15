import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import HomeScreen from "./pages/home-screen";

export default async function Main() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <HomeScreen data={data} />
    </>
  );
}
