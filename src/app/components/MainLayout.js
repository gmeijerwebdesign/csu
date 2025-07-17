// components/MainLayout.tsx
"use client";

import { useEffect, useState } from "react";
import HomeScreen from "../home/page";
import SideBar from "../blocks/sidebar";
import Header from "../blocks/header";
import Banner from "../blocks/banner";
import Settings from "../settings/page";
import Organization from "../organisation/page";
import { createClient } from "../utils/supabase/client";

export default function MainLayout({ user, products }) {
  const [currentNav, setCurrentNav] = useState("home");
  const supabase = createClient();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*, organisations(title, is_hoofd)")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
    };

    getProfile();
  }, []);

  const handleNavigation = (nav) => {
    setCurrentNav(nav);
    console.log(currentNav);
  };

  const displayScreen = (nav) => {
    const home = (
      <HomeScreen user={user} products={products} profile={profile} />
    );
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
      {/* {profile && (
        <div className="p-2">
          <p>User: {profile.email}</p>
          <p>Organisatie ID: {profile.organisation_id}</p>
          {profile.organisations.title}
          <p>Rol: {profile.role}</p>
        </div>
      )} */}
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
