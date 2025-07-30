// components/MainLayout.tsx
"use client";

import { useEffect, useState } from "react";
import HomeScreen from "./pages/home/page";
import SideBar from "./components/sidebar";
import Header from "./blocks/header";
import Banner from "./blocks/banner";
import Settings from "./pages/settings/page";
import Organization from "./pages/organisation/page";
import Admin from "./pages/admin/page";
import Notes from "./pages/notes/page.js";
export default function MainLayout({
  user,
  products,
  profile,
  organisations,
  notifications: initialNotifications,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-col w-full max-w-full">
        <Header
          user={user}
          profile={profile}
          handleNavigation={handleNavigation}
          isNotification={isNotification}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Banner />
        <div className="p-4 bg-[rgb(243,243,244)] w-full ">
          {displayScreen(currentNav)}
        </div>
      </div>
    </div>
  );
}
