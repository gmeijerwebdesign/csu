import { FaBell } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Header({
  profile,
  handleNavigation,
  isNotification,
  setIsSidebarOpen,
}) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return (
    <div className="p-4 flex justify-between bg-[#f3f3f4] w-full text-gray-500 text-sm items-center">
      <button className="hidden lg:block"></button>
      <GiHamburgerMenu
        className="text-2xl text-black block lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex gap-5 items-center">
        {/* Desktop-only info */}
        <div className="hidden sm:block">
          <p>
            Huidige week :{" "}
            <span className="font-bold">{`${year}-0${month}-0${day}`}</span>
          </p>
        </div>

        <div className="hidden sm:block">
          <p>
            Organisatie :{" "}
            <span className="font-bold">
              {profile?.organisations?.title || "Geen organisatie"}
            </span>
          </p>
        </div>

        {/* Always show bell */}
        <div className="relative">
          <FaBell
            className="text-[17px] text-amber-500 cursor-pointer"
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
