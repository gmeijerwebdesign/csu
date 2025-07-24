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
      router.push("/login");
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
    setIsSidebarOpen(false); // Sluit na klikken
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex min-h-screen pt-11 w-[15%] bg-[#2f3c50] text-[#e4e8ee] font-medium text-[12px]">
        <div className="flex flex-col gap-7 w-full">
          <p className="text-center">{user?.email}</p>
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
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-black bg-opacity-60">
          <div className="w-[100%] bg-[#2f3c50] h-full p-4 flex flex-col  text-white">
            <div className="flex items-center p-5">
              <p className="text-sm text-center mb-6">{user?.email}</p>
              <button
                className="text-right w-full text-white text-lg mb-4"
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
      )}
    </>
  );
}
