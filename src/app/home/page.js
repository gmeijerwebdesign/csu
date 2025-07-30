"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "./ProductTable";
import FormModal from "../blocks/formModal";
import OrganisationModal from "../blocks/organisationModal";
import Filters from "./filters";
import { getProducts } from "../utils/Products";
import Popup from "../components/popup";

export default function HomeScreen({ profile, organisations }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrg, setIsOpenOrg] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState(null);
  const [glow, setGlow] = useState(false);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [amountOrder, setAmountOrder] = useState("asc");
  const [productTitleOrder, setProductTitleOrder] = useState("");

  const [checkedRows, setCheckedRows] = useState({});

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getProducts(profile, {
        amountOrder,
        productTitleOrder,
      });
      setProducts(data);
      setIsLoading(false);
    };
    fetchInitial();
  }, [profile]);

  const toggleAmountSort = async () => {
    const newOrder = amountOrder === "asc" ? "desc" : "asc";
    setAmountOrder(newOrder);
    const data = await getProducts(profile, {
      amountOrder: newOrder,
      productTitleOrder,
    });
    setProducts(data);
  };

  const handleTitleSortSubmit = async (e) => {
    e.preventDefault();
    const data = await getProducts(profile, {
      amountOrder,
      productTitleOrder,
    });
    setProducts(data);
  };

  const handleDelete = async (product_id) => {
    if (!product_id) return console.error("Geen product_id beschikbaar!");

    const res = await fetch("/api/delete-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id,
        organisation_id: profile.organisation_id,
      }),
    });

    if (!res.ok) {
      console.error("Fout:", await res.text());
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.product_id !== product_id)
    );
    setGlow(true);
    setTimeout(() => setGlow(false), 2000);
  };

  const handleDeleteChecked = async () => {
    const e = Object.values(checkedRows);
    for (const { product_id } of e) {
      await handleDelete(product_id);
    }
    setCheckedRows({});
  };

  return (
    <div>
      <h1 className="py-4 font-bold text-xl text-slate-800">
        Inventariesatiebeheer
      </h1>
      {/* <Filters
        amountOrder={amountOrder}
        onAmountSortToggle={toggleAmountSort}
        productTitleOrder={productTitleOrder}
        setProductTitleOrder={setProductTitleOrder}
        onTitleSortSubmit={handleTitleSortSubmit}
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
        setIsOpenPopup={setIsOpenPopup}
      /> */}

      <ProductTable
        products={products}
        setSelectedTimeBox={setSelectedTimeBox}
        setIsOpen={setIsOpen}
        setMode={setMode}
        setProducts={setProducts}
        profile={profile}
        setGlow={setGlow}
        glow={glow}
        setIsOpenOrg={setIsOpenOrg}
        setSelectedProduct={setSelectedProduct}
        handleDelete={handleDelete}
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
      />

      {isOpenOrg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <OrganisationModal
            setIsOpenOrg={setIsOpenOrg}
            organisations={organisations}
            selectedProduct={selectedProduct}
          />
        </div>
      )}

      {isOpenPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Popup
            setIsOpenPopup={setIsOpenPopup}
            handleDelete={handleDeleteChecked}
            checkedRows={checkedRows}
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <FormModal
            selectedTimeBox={selectedTimeBox}
            setIsOpen={setIsOpen}
            mode={mode}
            profile={profile}
            setProducts={setProducts}
            setGlow={setGlow}
          />
        </div>
      )}
    </div>
  );
}
