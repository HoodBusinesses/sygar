import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useTranslate } from '@renderer/hooks/useTranslate';
import Profile_Img from '@renderer/assets/images/profile_img.png';



export default function EditProfile(): JSX.Element {
  const { t, isRtl } = useTranslate();

  return (
    <div
      className={`w-full px-8 py-12 mx-auto max-w-5xl ${isRtl ? 'rtl' : ''}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          {t('editProfile.updateProfile')}
        </h2>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-12">
        <Avatar className="h-24 w-24 border border-gray-300 rounded-full mb-4">
          <AvatarImage src={Profile_Img} alt="Profile Picture" />
          <AvatarFallback>NOTFOUND</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <UploadIcon className={`mr-2 h-5 w-5 ${isRtl ? 'ml-2' : 'mr-2'}`} />
          {t('editProfile.changePhoto')}
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        <h3 className="text-lg font-bold text-gray-700 mb-6">
          {t('editProfile.personalInfo')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              {t('editProfile.fullName.label')}
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue="John Doe"
              placeholder={t('editProfile.fullName.placeholder')}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              {t('editProfile.email.label')}
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="john@example.com"
              placeholder={t('editProfile.email.placeholder')}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label
              htmlFor="current-password"
              className="text-gray-700 font-medium"
            >
              {t('editProfile.currentPass.label')}
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder={t('editProfile.currentPass.placeholder')}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-gray-700 font-medium">
              {t('editProfile.newPass.label')}

            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder={t('editProfile.currentPass.placeholder')}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label
              htmlFor="confirm-password"
              className="text-gray-700 font-medium"
            >
              {t('editProfile.confirmPass.label')}
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder={t('editProfile.confirmPass.placeholder')}

              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div
        className={`flex ${isRtl ? 'justify-start' : 'justify-end'} mt-12 space-x-4`}
      >
        <Button
          variant="outline"
          className="text-gray-600 border-gray-300 hover:bg-gray-100 transition-colors rounded-md"
        >
          {t('buttons.cancel')}
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
          {t('buttons.save')}
        </Button>
      </div>
    </div>
  );
}

function UploadIcon(props): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
