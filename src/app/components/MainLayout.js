// components/MainLayout.tsx
"use client";

import { useEffect, useState } from "react";
import HomeScreen from "../home/page";
import SideBar from "../blocks/sidebar";
import Header from "../blocks/header";
import Banner from "../blocks/banner";
import Settings from "../settings/page";
import Organization from "../organisation/page";

export default function MainLayout({ user, products }) {
  const [currentNav, setCurrentNav] = useState("home");

  const handleNavigation = (nav) => {
    setCurrentNav(nav);
    console.log(currentNav);
  };

  const displayScreen = (nav) => {
    const home = <HomeScreen user={user} products={products} />;
    switch (nav) {
      case "home":
        return home;
      case "Settings":
        return <Settings />;
      case "Organisatiebeheer":
        return <Organization user={user} />;
      default:
        return home;
    }
  };

  return (
    <div className="flex">
      <SideBar user={user} handleNavigation={handleNavigation} />
      <div className="flex flex-col w-full max-w-full">
        <Header />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          {displayScreen(currentNav)}
        </div>
      </div>
    </div>
  );
}
