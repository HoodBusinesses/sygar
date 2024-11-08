import Logo from '../assets/images/logo.png';
import Notificatioons from './navbar/notificatioons';
import ProfilePopover from './navbar/profile';
import SelectLanguage from './SelectLanguage';

export default function Navbar() {
  return (
    <nav className=" flex w-full justify-between items-center bg-white text-gray-600 px-6 py-4 h-20 border-b shadow-md">
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
      <div className="flex items-center gap-6">
        {/* Profile */}
        <ProfilePopover />
        {/* Language Selector */}
        <SelectLanguage />

        {/* Notifications */}
        <Notificatioons />
      </div>
    </nav>
  );
}
