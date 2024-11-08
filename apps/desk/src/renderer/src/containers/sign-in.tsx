'use client';
import { Button } from '../components/ui/button';
import { useTranslate } from '@renderer/hooks/useTranslate';
import SelectLanguage from '@renderer/components/SelectLanguage';
import Logo from '@renderer/assets/images/logo.png';
import Pic from '@renderer/assets/images/pic.png';

const authUrl = 'http://localhost:3000/login';

export default function Signin() {
  const { t } = useTranslate();

  const handleSignIn = () => {
    // Uncomment when Electron API is available
    // if (window.electronAPI && window.electronAPI.openExternal) {
    //   window.electronAPI.openExternal(authUrl)
    // }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-300/25 to-blue-500 p-6 w-full h-screen sm:h-full">
      {/* Top Left Language Selection */}
      <div className="flex justify-start p-4">
        <SelectLanguage />
      </div>

      {/* Main content aligned in row */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-full m-auto p-8 rounded-xl">
        {/* Left Section */}
        <div className="w-full md:w-1/4 p-4 md:p-8 flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-6">
            <img
              src={Logo}
              width={120}
              height={120}
              alt="Logo"
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('Nice to see you again, please signin to your account')}
          </h1>
          <Button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={handleSignIn}
          >
            {t('Sign in')}
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            {t(
              'We will take you to the browser to log in and then bring you back'
            )}
          </p>
        </div>

        {/* Right Section with Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={Pic}
            alt="Sign-in Illustration"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
