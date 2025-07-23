import { FaBell } from "react-icons/fa6";
import { useEffect, useState } from "react";
export default function Header({
  user,
  profile,
  handleNavigation,
  isNotification,
}) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return (
    <div className="p-4 flex justify-between bg-[#f3f3f4] w-full text-gray-500 text-sm">
      <button></button>
      <div className=" flex gap-5 items-center">
        <p>
          Huidige week :{" "}
          <span className="font-bold">{`${year}-0${month}-0${day}`}</span>
        </p>
        <p>
          ingelogd als : <span className="font-bold">{user.email}</span>
        </p>
        <p>
          Organisatie :{" "}
          <span className="font-bold">
            {profile?.organisations?.title || "Geen organisatie"}
          </span>
        </p>

        <div className="relative">
          <FaBell
            className={"text-[17px]  text-amber-500 "}
            onClick={() => handleNavigation("notes")}
          />

          {isNotification && (
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
