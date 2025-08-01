// hooks/useInventory.ts
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../utils/Products";

export default function useHook(profile) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [amountOrder, setAmountOrder] = useState("asc");
  const [productTitleOrder, setProductTitleOrder] = useState("");
  const [glow, setGlow] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});

  const fetchProducts = async (override = {}) => {
    setIsLoading(true);
    const data = await getProducts(profile, {
      amountOrder,
      productTitleOrder,
      ...override,
    });
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (profile) fetchProducts();
  }, [profile, amountOrder, productTitleOrder]);

  const toggleAmountSort = () => {
    setAmountOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = async (product_id) => {
    const { success } = await deleteProduct(
      product_id,
      profile.organisation_id
    );
    if (!success) return;

    setProducts((prev) => prev.filter((p) => p.product_id !== product_id));
    setGlow(true);
    setTimeout(() => setGlow(false), 2000);
  };

  const handleTitleSortSubmit = async (e) => {
    e.preventDefault();
    const data = await getProducts(profile, {
      amountOrder,
      productTitleOrder,
    });
    setProducts(data);
  };

  const handleDeleteChecked = async () => {
    const toDelete = Object.values(checkedRows);
    for (const { product_id } of toDelete) {
      await handleDelete(product_id);
    }
    setCheckedRows({});
  };

  return {
    products,
    isLoading,
    glow,
    setGlow,
    amountOrder,
    productTitleOrder,
    setProductTitleOrder,
    handleTitleSortSubmit,
    toggleAmountSort,
    handleDelete,
    handleDeleteChecked,
    setCheckedRows,
    checkedRows,
    setProducts,
  };
}
