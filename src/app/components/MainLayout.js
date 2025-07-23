// components/MainLayout.tsx
"use client";

import { useEffect, useState } from "react";
import HomeScreen from "../home/page";
import SideBar from "../blocks/sidebar";
import Header from "../blocks/header";
import Banner from "../blocks/banner";
import Settings from "../settings/page";
import Organization from "../organisation/page";
import Admin from "../admin/page";
import Notes from "../notes/page.js";
export default function MainLayout({
  user,
  products,
  profile,
  organisations,
  notifications: initialNotifications,
}) {
  const [currentNav, setCurrentNav] = useState("home");
  const [notifications, setNotifications] = useState(
    initialNotifications || []
  );

  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    setIsNotification(notifications.length > 0);
  }, [notifications]);

  const handleDeleteNotification = (noteId) => {
    setNotifications((prev) => prev.filter((note) => note.id !== noteId));
  };

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
      case "notes":
        return (
          <Notes
            notifications={notifications}
            OnDelete={handleDeleteNotification}
          />
        );
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
        <Header
          user={user}
          profile={profile}
          handleNavigation={handleNavigation}
          isNotification={isNotification}
        />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          {displayScreen(currentNav)}
        </div>
      </div>
    </div>
  );
}
