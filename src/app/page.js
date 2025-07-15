import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import HomeScreen from "./home/page.js";
import SideBar from "./blocks/sidebar";
import Header from "./blocks/header";
import Banner from "./blocks/banner";

export default async function Main() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <SideBar data={data} />
      <div className="flex flex-col w-full max-w-full">
        <Header />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          <HomeScreen data={data} />
        </div>
      </div>
    </div>
  );
}
