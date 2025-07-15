import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import HomeScreen from "./pages/home-screen";
import SideBar from "./pages/blocks/sidebar";

export default async function Main() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <SideBar />
      <HomeScreen data={data} />
    </div>
  );
}
