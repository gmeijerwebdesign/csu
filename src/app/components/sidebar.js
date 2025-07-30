"use client";
import { SlCalender } from "react-icons/sl";
import { MdOutlineLogout } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { RiAdminFill } from "react-icons/ri";
export default function SideBar({
  handleNavigation,
  user,
  profile,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/pages/login");
    } else {
      console.error("Logout mislukt:", error.message);
    }
  };

  const menuItems = [
    { label: "Inventarisbeheer", value: "home", icon: <SlCalender /> },
    { label: "Instellingen", value: "Settings", icon: <IoMdSettings /> },
    { label: "Uitloggen", value: "logout", icon: <MdOutlineLogout /> },
  ];

  if (profile.organisation_id === 13) {
    menuItems.push(
      { label: "admin", value: "admin", icon: <RiAdminFill /> },
      {
        label: "Organisatiebeheer",
        value: "Organisatiebeheer",
        icon: <FaCircleInfo />,
      }
    );
  }

  const handleClick = (value) => {
    if (value === "logout") {
      handleLogout();
    } else {
      handleNavigation(value);
    }
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex min-h-screen pt-11 w-[15%] bg-[#161c26] text-[#e4e8ee] font-medium text-[12px]">
        <div className="flex flex-col gap-7 w-full">
          <p className="text-center relative -top-6">{user?.email}</p>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 hover:bg-[#25333f] px-4 py-2 rounded cursor-pointer"
              onClick={() => handleClick(item.value)}
            >
              {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile overlay sidebar */}

      <div
        className={`lg:hidden fixed inset-0 z-[9999] flex transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-60"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sliding panel */}
        <div
          className={`relative bg-[#2f3c50] text-white w-[100%] h-full transform transition-transform duration-500 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <p className="text-sm">{user?.email}</p>
            <button
              className="text-white text-xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 hover:bg-[#25333f] px-4 py-2 rounded cursor-pointer"
              onClick={() => handleClick(item.value)}
            >
              {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
