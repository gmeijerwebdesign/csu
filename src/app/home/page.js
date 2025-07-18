"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "./ProductTable";
import FormModal from "../blocks/formModal";

export default function HomeScreen({ user, products, profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [mode, setMode] = useState(null);
  const router = useRouter();

  return (
    <div>
      <div className="p-4">
        <ProductTable
          products={products}
          setSelectedTimeBox={setSelectedTimeBox}
          setIsOpen={setIsOpen}
          setMode={setMode}
          profile={profile}
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 ">
          <FormModal
            selectedTimeBox={selectedTimeBox}
            setIsOpen={setIsOpen}
            mode={mode}
            profile={profile}
          />
        </div>
      ) : null}
    </div>
  );
}
