"use client";
import { SlCalender } from "react-icons/sl";
import { MdOutlineLogout } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function SideBar({ session, handleNavigation, user }) {
  const router = useRouter();

  const menuItems = [
    { label: "Inventarisadministratie", value: "home", icon: <SlCalender /> },
    {
      label: "Organisatiebeheer",
      value: "Organisatiebeheer",
      icon: <FaCircleInfo />,
    },
    {
      label: "Settings",
      value: "Settings",
      icon: <IoMdSettings />,
    },

    { label: "Uitloggen", value: "logout", icon: <MdOutlineLogout /> },
  ];

  // if (session?.user?.role === "Manager") {
  //   menuItems.push({ label: "admin", value: "admin", icon: <RiAdminFill /> });
  // }

  return (
    <div className="hidden lg:flex  min-h-screen pt-11 w-[15%] bg-[#2f3c50] text-[#e4e8ee] font-medium text-[12px]">
      <div className="flex flex-col gap-7 w-full ">
        <p className="text-center">{user?.email}</p>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:bg-[#25333f] px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              if (item.value === "logout") {
              } else {
                handleNavigation(item.value);
              }
            }}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
