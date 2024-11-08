import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function ProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center cursor-pointer gap-1">
        <FaUserCircle className="text-2xl text-gray-700" />
        <HiOutlineChevronDown className="text-sm text-gray-500" />
      </PopoverTrigger>

      <PopoverContent className="mt-5 bg-white rounded-lg p-5 border shadow-lg">
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
      </PopoverContent>
    </Popover>
  );
}
