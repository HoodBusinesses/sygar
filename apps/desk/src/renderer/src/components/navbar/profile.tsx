import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useRouter } from '@tanstack/react-router';
import { Button } from '../ui/button';

export default function ProfilePopover() {
  const router = useRouter();
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

        <Button
          onClick={() => router.navigate({ to: '/profile' })}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 text-sm"
        >
          Profile Page
        </Button>

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
