import { useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { useTranslate } from '@renderer/hooks/useTranslate'
import Logo from '../assets/images/logo.png'

export default function Navbar() {
  const [language, setLanguage] = useState('English')
  const { t, lng, isRtl } = useTranslate()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isNotificationOpen, setNotificationOpen] = useState(false)
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'quia-voluptatem-doloribus',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '2 seconds ago',
      viewed: false,
      clicked: false,
      icon: '/images/avatar-icon.png'
    },
    {
      id: 2,
      title: 'quia-voluptatem-doloris',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '3 hours ago',
      viewed: false,
      clicked: false,
      icon: '/images/avatar-icon.png'
    },
    {
      id: 3,
      title: 'quia-voluptatem-doloris',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '4 days ago',
      viewed: true,
      clicked: false,
      icon: '/images/avatar-icon.png'
    }
  ])

  const markAsClicked = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, clicked: true, viewed: true } : notification
      )
    )
  }

  const languageOptions = ['English(UK)', 'Frensh', 'Spanish']

  return (
    <nav className="fixed flex w-full justify-between items-center bg-white text-gray-600 px-6 py-4 h-20 border-b shadow-md z-10">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src={Logo}
          width={100}
          height={80}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right Section: Profile, Language, Notifications */}
      <div className="flex items-center space-x-6">
        {/* User Profile */}
        <div
          className="relative flex items-center cursor-pointer space-x-2"
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
        >
          <FaUserCircle className="text-3xl" />
          <span className="text-sm text-gray-600">Sygafor Admin</span>
          <HiOutlineChevronDown className="text-base text-gray-500" />

          {isUserMenuOpen && (
            <div className="absolute right-0 top-14 mt-1 w-48 bg-white rounded-lg p-5 z-50 border shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <FaUserCircle className="text-5xl" />
                <p className="font-semibold text-xl">Sygafor Admin</p>
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 text-sm">
                Profile Page
              </button>

              <hr className="my-2" />

              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <FiLogOut className="text-lg" />
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
            className="flex items-center cursor-pointer space-x-2 border rounded-md py-2 px-3"
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            <span className="text-sm text-gray-500">{language}</span>
            <HiOutlineChevronDown className="text-gray-500" />
          </div>

          {isLanguageMenuOpen && (
            <div className="absolute top-14 right-0 w-40 bg-white rounded-lg shadow-md border mt-1 z-50">
              {languageOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                    option === language ? 'font-semibold' : ''
                  }`}
                  onClick={() => {
                    setLanguage(option)
                    setIsLanguageMenuOpen(false)
                  }}
                >
                  <span
                    className={`h-4 w-4 rounded-full border border-gray-400 mr-3 flex items-center justify-center ${
                      option === language ? 'bg-gray-400' : ''
                    }`}
                  >
                    {option === language && <span className="h-2 w-2 bg-white rounded-full"></span>}
                  </span>
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <IoNotificationsOutline
            className="text-2xl"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          />

          {isNotificationOpen && (
            <div className="absolute right-0 top-14 mt-1 w-72 bg-white shadow-lg rounded-lg p-4 z-50 border overflow-y-auto max-h-96">
              <h3 className="text-sm font-semibold mb-3">Notifications</h3>

              {notifications.length > 0 ? (
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`flex justify-between items-start p-3 rounded-md cursor-pointer transition-all ${
                        notification.clicked
                          ? 'bg-white border-l-4 border-transparent'
                          : notification.viewed
                            ? 'bg-[#eff6ff] border-l-4 border-transparent'
                            : 'bg-blue-50 border-l-4 border-blue-500'
                      }`}
                      onClick={() => markAsClicked(notification.id)}
                    >
                      <div className="flex space-x-3 items-start">
                        <img
                          src={notification.icon}
                          alt="Icon"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p
                            className={`text-sm ${
                              notification.viewed ? 'text-gray-700' : 'font-semibold text-gray-900'
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <IoNotificationsOutline className="h-12 w-12 mb-2" />
                  <p className="text-sm">No Notifications</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
