"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import ProductTable from "./ProductTable";
import FormModal from "../blocks/formModal";

export default function HomeScreen({ user, products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [mode, setMode] = useState(null);
  const supabase = createClient();
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  }

  return (
    <div>
      <div className="p-4">
        <ProductTable
          products={products}
          setSelectedTimeBox={setSelectedTimeBox}
          setIsOpen={setIsOpen}
          mode={mode}
          setMode={setMode}
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 ">
          <FormModal
            setIsOpen={setIsOpen}
            mode={mode}
            selectedTimeBox={selectedTimeBox}
          />
        </div>
      ) : null}
    </div>
  );
}
