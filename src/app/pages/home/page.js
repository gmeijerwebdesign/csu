"use client";
import React, { useState, useCallback, useEffect } from "react";
import ProductTable from "./tabs/ProductTable";
import FormModal from "../../components/formModal";
import OrganisationModal from "../../components/organisationModal";
import Filters from "./components/filters";
import Popup from "../../blocks/popup";
import useHook from "../../hooks/useHook";
import Footer from "@/app/components/footer";
import HomeNav from "./components/homeNav";
import UserInformation from "./tabs/UserInformation";
import AllUsers from "./tabs/AllUsers";
import UserFilters from "./components/userFilters";
import CheckUser from "./components/checkUser";

export default function HomeScreen({
  profile,
  organisations,
  currentTab,
  setCurrentTab,
  teamProfiles,
}) {
  const [isOpen, setIsOpen] = useState(false); // form modal
  const [isOpenOrg, setIsOpenOrg] = useState(false); // organisation modal
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedTimeBox, setSelectedTimeBox] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEditMode, setUserEditMode] = useState(false);

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

  const showFilters = currentTab === "inventaris";
  const showUserFilters = currentTab === "medewerkerkaart";

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
    setCurrentTab,
    teamProfiles,
    selectedUser,
    setSelectedUser,
    userEditMode,
    setUserEditMode,
  };
  useEffect(() => {
    // Reset edit mode when user is deselected or tab is changed
    if (selectedUser === null || currentTab !== "medewerkerkaart") {
      setUserEditMode(false);
      setSelectedUser(null);
    }
  }, [selectedUser, currentTab]);

  const renderSelectedTab = useCallback(() => {
    switch (currentTab) {
      case "inventaris":
        return <ProductTable {...allProps} />;

      case "medewerkerkaart":
        return selectedUser === null ? (
          <AllUsers {...allProps} />
        ) : userEditMode ? (
          <UserInformation profile={selectedUser} />
        ) : (
          <CheckUser {...allProps} />
        );

      default:
        return null;
    }
  }, [allProps, currentTab, selectedUser, userEditMode]);

  return (
    <div>
      <div className="p-4 ">
        <HomeNav {...allProps} />
        {showFilters && <Filters {...allProps} />}
        {showUserFilters && <UserFilters {...allProps} />}

        {/* main */}
        {renderSelectedTab()}
        {/* modals */}
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
