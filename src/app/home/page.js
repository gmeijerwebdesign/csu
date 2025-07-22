"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "./ProductTable";
import FormModal from "../blocks/formModal";
// Inventariesatiebeheer scherm
export default function HomeScreen({
  user,
  products: initialProducts,
  profile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [mode, setMode] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();
  const [glow, setGlow] = useState(false);

  return (
    <div>
      <div>
        <h1 className="py-4 font-bold text-xl text-slate-800">
          Inventariesatiebeheer
        </h1>
        <ProductTable
          products={products}
          setSelectedTimeBox={setSelectedTimeBox}
          setIsOpen={setIsOpen}
          setMode={setMode}
          setProducts={setProducts}
          profile={profile}
          setGlow={setGlow}
          glow={glow}
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 ">
          <FormModal
            selectedTimeBox={selectedTimeBox}
            setIsOpen={setIsOpen}
            mode={mode}
            profile={profile}
            setProducts={setProducts} // ✅ hier!
            setGlow={setGlow}
          />
        </div>
      ) : null}
    </div>
  );
}
