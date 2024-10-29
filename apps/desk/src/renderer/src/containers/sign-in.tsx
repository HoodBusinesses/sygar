'use client'
import { Button } from '../components/ui/button'
import { useTranslate } from '@renderer/hooks/useTranslate'
import SelectLanguage from '@renderer/components/SelectLanguage'
import Logo from '@renderer/assets/images/logo.png'
import Pic from '@renderer/assets/images/pic.png'

const authUrl = 'http://localhost:3000/login' // URL to authenticate the user

export default function Signin() {
  // get the translation function from the hook , it will return also { t, i18n }
  const { t } = useTranslate()

  const handleSignIn = () => {
    // Use the exposed electronAPI to open the URL in the browser
    // if (window.electronAPI && window.electronAPI.openExternal) {
    //   window.electronAPI.openExternal(authUrl)
    //   console.log('OPEN EXTERNAL')
    // } else {
    //   console.error('Electron API is not available')
    // }
    // <a href={authUrl}></a>
  }

  return (
    <div
      className="flex bg-white bg-gradient-to-blue min-h-screen p-6 "
      // style={{ backgroundImage: 'url("/images/background.png") , linear-gradient(269.56deg, #2563EB -3.3%, #FFFFFF 101.39%)' }}
    >
      <SelectLanguage />

      <div className="m-auto rounded-xl flex flex-col md:flex-row w-full max-w-4xl">
        <div className="p-6 md:p-10 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <img src={Logo} width={100} height={100} alt="" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>
            <Button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={handleSignIn}
            >
              {t('signin')}
            </Button>
            <p className="text-sm text-gray-600 mt-2">{t('paragraph')}</p>
          </div>
          <div className="mt-8">
            <p className="text-sm text-gray-600">
              {t('dontHaveAccount')}{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                {t('create')}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="m-auto flex flex-col md:fle</div>x-row w-full max-w-4xl">
        <img src={Pic} alt="Pic" width={500} height={500} />
      </div>
    </div>
  )
}
