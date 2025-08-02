import { useEffect, useState } from "react";

export default function Banner({ currentNav }) {
  const [bannerTitle, setBannerTitle] = useState("");
  useEffect(() => {
    switch (currentNav) {
      case "home":
        setBannerTitle("Dashboard");
        break;
      case "Settings":
        setBannerTitle("Settings");
        break;
      case "admin":
        setBannerTitle("Admin");
        break;
      case "Organisatiebeheer":
        setBannerTitle("Organisatiebeheer");
        break;
      default:
        setBannerTitle("Dashboard");
    }
  }, [currentNav]);
  return (
    <div className="p-4 flex justify-between shadow-sm w-full text-gray-500 text-sm items-center">
      <h1 className=" font-bold text-2xl tracking-wide text-slate-800">
        {bannerTitle}
      </h1>
    </div>
  );
}
