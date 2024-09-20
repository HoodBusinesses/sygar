import { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa"; // Optional: for user icon
import { HiOutlineChevronDown } from "react-icons/hi"; // Optional: for dropdown
import { IoNotificationsOutline } from "react-icons/io5";

export default function Navbar() {
  const [language, setLanguage] = useState("English");

  return (
    <nav className="flex justify-between items-center bg-white text-gray-500 hover:text-gray-700 shadow-lg px-4 py-2">
      <div>
        <Image src={"/images/logo.png"} width={100} height={100} alt="" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
          <span>Sygafor Admin</span>
          <HiOutlineChevronDown />
        </div>
        <div className="flex items-center cursor-pointer">
          {/* <span className="mr-2"></span> */}
          <select
            className="border p-1 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="French">Français</option>
            <option value="Arabic">العربية</option>
          </select>
        </div>
        <IoNotificationsOutline />
      </div>
    </nav>
  );
}
