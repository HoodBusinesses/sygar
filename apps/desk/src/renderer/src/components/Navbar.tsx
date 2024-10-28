'use client'

import { FaUserCircle } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import SelectLanguage from "./SelectLanguage";
import Logo from "../assets/images/logo.png";

export default function Navbar(): JSX.Element {

  // const { addToast } = useToast();

  //   const handleNotificationClick = () => {
  //       addToast("Notification", "You have new notifications!");
  //   };

  return (
    <nav className="flex w-full justify-between items-center bg-white text-gray-500 hover:text-gray-700 shadow-lg px-4 py-2">
      <div>
        <img src={Logo} width={100} height={100} alt="" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
          <span>Sygafor Admin</span>
          <HiOutlineChevronDown />
        </div>
        {/* <div className="flex items-center cursor-pointer">
          <select
            className="border bg-white p-1 rounded-md"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}
        <SelectLanguage />

        <IoNotificationsOutline />
      </div>
    </nav>
  )
}
