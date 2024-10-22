import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  // Simulated notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "quia-voluptatem-doloribus",
      message: "Quia sed inventore non quia reiciendis qui reprehenderit.",
      time: "2 seconds ago",
      viewed: false,
      clicked: false,
      icon: "/images/avatar-icon.png", // Replace with your avatar/icon path
    },
    {
      id: 2,
      title: "quia-voluptatem-doloris",
      message: "Quia sed inventore non quia reiciendis qui reprehenderit.",
      time: "3 hours ago",
      viewed: false,
      clicked: false,
      icon: "/images/avatar-icon.png", // Replace with your avatar/icon path
    },
    {
      id: 3,
      title: "quia-voluptatem-doloris",
      message: "Quia sed inventore non quia reiciendis qui reprehenderit.",
      time: "4 days ago",
      viewed: true,
      clicked: false,
      icon: "/images/avatar-icon.png", // Replace with your avatar/icon path
    },
  ]);

  const markAsClicked = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, clicked: true, viewed: true }
          : notification
      )
    );
  };

  const languageOptions = ["English(UK)", "Frensh", "Spanish"];

  return (
    <nav className="flex w-full justify-between items-center bg-white text-gray-600 px-6 py-4 border-b shadow-sm">
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          width={120}
          height={120}
          alt="Logo"
          className="object-contain"
        />
      </div>

      <div className="flex items-center space-x-5">
        {/* User Profile */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
        >
          <FaUserCircle className="text-2xl" />
          <span className="ml-1 text-base text-gray-600">Sygafor Admin</span>
          <HiOutlineChevronDown className="ml-1 text-base text-gray-500" />

          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg p-4 z-50 border shadow-md">
              <div className="flex items-center space-x-2 mb-3">
                <FaUserCircle className="text-4xl" />
                <div>
                  <p className="font-semibold">Sygafor Admin</p>
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 text-sm">
                Profile Page
              </button>

              <hr className="my-1" />

              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <FiLogOut />
                <a href="#" className="text-sm text-gray-600">
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer space-x-1 border rounded-md py-1 px-2"
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            <span className="text-gray-500">{language}</span>
            <HiOutlineChevronDown className="text-gray-500" />
          </div>

          {isLanguageMenuOpen && (
            <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-md border mt-2 z-50">
              {languageOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${
                    option === language ? "font-semibold" : ""
                  }`}
                  onClick={() => {
                    setLanguage(option);
                    setIsLanguageMenuOpen(false);
                  }}
                >
                  <span
                    className={`h-4 w-4 rounded-full border border-gray-400 mr-3 flex items-center justify-center ${
                      option === language ? "bg-gray-400" : ""
                    }`}
                  >
                    {option === language && (
                      <span className="h-2 w-2 bg-white rounded-full"></span>
                    )}
                  </span>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative flex items-center cursor-pointer">
          <IoNotificationsOutline
            className="text-2xl"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          />

          {isNotificationOpen && (
            <div className="absolute right-0 top-12 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50 border overflow-y-auto max-h-96 custom-scrollbar">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>

              {notifications.length > 0 ? (
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`flex justify-between items-start p-3 rounded-lg cursor-pointer transition-all ${
                        notification.clicked
                          ? "bg-white border-l-4 border-transparent"
                          : notification.viewed
                            ? "bg-[#eff6ff] border-l-4 border-transparent"
                            : "bg-blue-50 border-l-4 border-blue-500"
                      }`}
                      onClick={() => markAsClicked(notification.id)}
                    >
                      <div className="flex space-x-3 items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={notification.icon}
                            alt="Notification Icon"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              notification.clicked || notification.viewed
                                ? "text-gray-700"
                                : "font-semibold text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-48">
                  {/* No Notifications Icon */}
                  <div className="text-gray-400 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.31-2.69-6-6-6S6 7.69 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    No Notifications
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    We’ll let you know when there will be something to update
                    you.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
