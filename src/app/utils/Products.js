// utils/Products.js
import { createClient } from "./supabase/client";

export async function getProducts(profile, filters = {}) {
  const supabase = createClient();

  const isCSU = profile?.organisation_id === 13;
  const table = isCSU ? "csu_inventory" : "organisation_inventory";

  let query = supabase.from(table).select();

  if (!isCSU) {
    query = query.eq("organisation_id", profile.organisation_id);
  }
  if (filters.productTitleOrder) {
    query = query.ilike("title", `%${filters.productTitleOrder}%`);
  }

  // 🔽 Sorteer op filters
  if (filters.amountOrder) {
    query = query.order("amount", { ascending: filters.amountOrder === "asc" });
  } else {
    query = query.order("id", { ascending: true }); // fallback
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return products || [];
}

export async function deleteProduct(product_id, organisation_id) {
  const res = await fetch("/api/delete-product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id, organisation_id }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fout bij verwijderen product:", errorText);
    return { success: false, error: errorText };
  }

  return { success: true };
}
