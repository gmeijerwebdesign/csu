"use client";
import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import FormModal from "../../components/formModal";
import OrganisationModal from "../../components/organisationModal";
import Filters from "./components/filters";
import Popup from "../../blocks/popup";
import useHook from "../../hooks/useHook";
import Footer from "@/app/components/footer";
import HomeNav from "./components/homeNav";

export default function HomeScreen({
  profile,
  organisations,
  currentTab,
  setCurrentTab,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrg, setIsOpenOrg] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState(null);

  const {
    products,
    isLoading,
    glow,
    amountOrder,
    productTitleOrder,
    setProductTitleOrder,
    handleTitleSortSubmit,
    toggleAmountSort,
    handleDelete,
    handleDeleteChecked,
    checkedRows,
    setCheckedRows,

    setGlow,
    setProducts,
  } = useHook(profile);

  const allProps = {
    products,
    isLoading,
    glow,
    amountOrder,
    productTitleOrder,
    selectedProduct,
    setSelectedProduct,
    setIsOpenOrg,
    organisations,
    setProductTitleOrder,
    handleTitleSortSubmit,
    toggleAmountSort,
    handleDelete,
    handleDeleteChecked,
    checkedRows,
    setCheckedRows,
    setGlow,
    setProducts,
    setIsOpenPopup,
    mode,
    setMode,
    selectedTimeBox,
    setSelectedTimeBox,
    setIsOpen,
    profile,
    setProducts,
  };

  const renderSelectedTab = () => {
    switch (currentTab) {
      case "inventaris":
        return <ProductTable {...allProps} />;
        break;
    }
  };

  return (
    <div>
      <div className="p-4">
        <HomeNav {...allProps} />
        <Filters {...allProps} />
        {/* main */}
        {renderSelectedTab()}
        {/*  */}
        {isOpenOrg && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <OrganisationModal {...allProps} />
          </div>
        )}

        {isOpenPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Popup {...allProps} />
          </div>
        )}

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <FormModal {...allProps} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
