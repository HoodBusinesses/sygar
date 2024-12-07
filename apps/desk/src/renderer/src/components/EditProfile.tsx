import Profile_Img from '@renderer/assets/images/profile_img.png';
import { User } from '@renderer/hooks/api/user/me';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { ProfileFormData } from '@renderer/utils/schemas/formSchema';
import { UploadIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import useHandleEditProfile from '@renderer/hooks/editForms/useHandleEditProfile';
import { profileFields } from '@renderer/data/organinzation-fields-input';
import FormInputItem from './ui/form-input-item';
import { FaSpinner } from 'react-icons/fa';

export default function EditProfile({ data }: { data: User }): JSX.Element {

  const { t, isRtl } = useTranslate();

  const { methods,
    isPending,
    handleSubmit,
  } = useHandleEditProfile(data)

  const defaultValues = useMemo(() => {
    return {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      id: data?.id ?? '',
    };
  }, [data]);

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
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
        <h3 className="text-lg font-bold text-gray-700 mb-6">
          {t('editProfile.personalInfo')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={methods.register(
                field.name as keyof ProfileFormData
              )}
              value={defaultValues[field.name]}
              error={methods.formState.errors[field.name]?.message}
              required={field.required}
              isLogoInput={field.isLogoInput}
            />
          ))}
        </div>

        {/* Footer Buttons */}
        <div
          className={`flex mt-12 space-x-4`}
        >
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 w-1/4 text-white hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
          >
            {isPending ? <FaSpinner /> : t('buttons.save')}
          </Button>
        </div>
      </form>
    </div>
  );
}