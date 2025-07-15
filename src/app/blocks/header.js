import { IoMdMail } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
export default function Header({ name }) {
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
          <span className="font-bold">{`${year}-${month}-${day}`}</span>
        </p>
        <p>
          ingelogd als : <span className="font-bold">{name}</span>
        </p>
        <p>
          Organisatie : <span className="font-bold">{name}</span>
        </p>
        <IoMdMail className="text-[17px]" />
        <FaBell className="text-[17px]" />
      </div>
    </div>
  );
}
