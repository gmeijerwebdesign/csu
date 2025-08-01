import { FaRegBell } from "react-icons/fa";
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
    <div className="p-4 flex justify-between shadow-sm w-full text-gray-500 text-sm items-center">
      <button className="hidden lg:block"></button>
      <GiHamburgerMenu
        className="text-2xl text-black block lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex gap-5 items-center">
        <div className="relative">
          <FaRegBell
            className="text-[20px] text-black cursor-pointer"
            onClick={() => handleNavigation("notes")}
          />
          {/* notifier */}
          {isNotification && (
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
        <img
          src="disney.png"
          className="h-[30px] w-[30px] rounded-full border-2 "
        />
      </div>
    </div>
  );
}
