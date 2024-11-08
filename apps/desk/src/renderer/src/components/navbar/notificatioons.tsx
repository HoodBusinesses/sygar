import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import notificationLogo from '../../assets/images/e500ce5d4441128b7e196000d7afdb72.png';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function Notificatioons() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'quia-voluptatem-doloribus',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '2 seconds ago',
      viewed: false,
      clicked: false,
    },
    {
      id: 2,
      title: 'quia-voluptatem-doloribus',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '3 hours ago',
      viewed: false,
      clicked: false,
      icon: '/images/avatar-icon.png',
    },
    {
      id: 3,
      title: 'quia-voluptatem-doloribus',
      message: 'Quia sed inventore non quia reiciendis qui reprehenderit.',
      time: '4 days ago',
      viewed: true,
      clicked: false,
      icon: '/images/avatar-icon.png',
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
  return (
    <Popover>
      <PopoverTrigger>
        <IoNotificationsOutline className="text-2xl cursor-pointer" />
      </PopoverTrigger>

      <PopoverContent className="mt-6 w-96 bg-white shadow-lg rounded-lg p-5 border overflow-y-auto max-h-[32rem] custom-scrollbar">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Notifications
        </h3>

        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex justify-between items-start p-5 rounded-lg cursor-pointer transition-all shadow-md ${
                  notification.clicked
                    ? 'bg-white border border-gray-200'
                    : notification.viewed
                      ? 'bg-[#eff6ff] border border-gray-300'
                      : 'bg-blue-50 border border-blue-300'
                }`}
                onClick={() => markAsClicked(notification.id)}
              >
                <div className="flex space-x-4 items-start">
                  <div className="w-24 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <img
                      src={notificationLogo}
                      alt="Notification Icon"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p
                      className={`text-base ${
                        notification.viewed
                          ? 'text-gray-700'
                          : 'font-semibold text-gray-900'
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-base text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {notification.time}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <IoNotificationsOutline className="h-14 w-14 mb-2" />
            <p className="text-base">No Notifications</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
