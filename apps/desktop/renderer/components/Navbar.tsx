import { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ar', label: 'العربية' }
  ];

  return (
    <nav className="flex w-full justify-between items-center bg-white text-gray-500 hover:text-gray-700 shadow-lg px-4 py-2">
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
        </div>
        <IoNotificationsOutline />
      </div>
    </nav>
  );
}