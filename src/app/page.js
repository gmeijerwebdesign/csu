// app/page.tsx of waar je ook je entry-point hebt
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import MainLayout from "./components/MainLayout";
import { getProducts } from "./utils/Products.js";

export default async function Main() {
  const products = await getProducts();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return <MainLayout user={data.user} products={products} />;
}
