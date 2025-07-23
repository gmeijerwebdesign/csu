// components/MainLayout.tsx
"use client";

import { useState } from "react";
import HomeScreen from "../home/page";
import SideBar from "../blocks/sidebar";
import Header from "../blocks/header";
import Banner from "../blocks/banner";
import Settings from "../settings/page";
import Organization from "../organisation/page";
import { createClient } from "../utils/supabase/client";
import Admin from "../admin/page";

export default function MainLayout({ user, products, profile, organisations }) {
  const [currentNav, setCurrentNav] = useState("home");
  const supabase = createClient();

  const handleNavigation = (nav) => {
    setCurrentNav(nav);
    console.log(currentNav);
  };

  const displayScreen = (nav) => {
    const home = (
      <HomeScreen
        user={user}
        products={products}
        profile={profile}
        organisations={organisations}
      />
    );
    switch (nav) {
      case "home":
        return home;
      case "Settings":
        return <Settings />;
      case "admin":
        return <Admin organisations={organisations} />;
      case "Organisatiebeheer":
        return (
          <Organization
            user={user}
            profile={profile}
            organisations={organisations}
          />
        );
      default:
        return home;
    }
  };

  return (
    <div className="flex">
      <SideBar
        user={user}
        handleNavigation={handleNavigation}
        profile={profile}
      />
      <div className="flex flex-col w-full max-w-full">
        <Header user={user} profile={profile} />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          {displayScreen(currentNav)}
        </div>
      </div>
    </div>
  );
}
