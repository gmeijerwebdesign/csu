// components/MainLayout.tsx
"use client";

import { useState } from "react";
import HomeScreen from "../home/page";
import SideBar from "../blocks/sidebar";
import Header from "../blocks/header";
import Banner from "../blocks/banner";

export default function MainLayout({ user }) {
  const [currentNav, setCurrentNav] = useState("home");

  const handleNavigation = (nav) => {
    setCurrentNav(nav);
  };

  return (
    <div className="flex">
      <SideBar user={user} handleNavigation={handleNavigation} />
      <div className="flex flex-col w-full max-w-full">
        <Header />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          <HomeScreen user={user} />
        </div>
      </div>
    </div>
  );
}
