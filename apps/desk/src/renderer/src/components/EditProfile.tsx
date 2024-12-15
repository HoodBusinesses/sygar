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
import { Controller } from 'react-hook-form';
import PhoneInputItem from './ui/phone-input-item';
import { Card, CardContent } from './ui/card';

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
    <div className='p-4  py-6 space-y-6 w-full '>
      <h1 className="text-2xl font-semibold text-gray-950">
        {t('editProfile.updateProfile')}
      </h1>
      {/* Form Fields */}
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className='flex flex-col gap-4'>
          <CardContent className='pt-4'>

            <h3 className="text-lg font-bold text-gray-700 mb-6">
              {t('editProfile.personalInfo')}
            </h3>

            {/* Avatar Section */}
            <div className="flex flex-col gap-4 mb-12">
              <Avatar className="h-24 w-24 border border-gray-300 rounded-full mb-4">
                <AvatarImage src={Profile_Img} alt="Profile Picture" />
                <AvatarFallback>NOTFOUND</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 h-10 cursor-pointer hover:bg-gray-50 w-52">
                <input type="file" className="hidden" id="profileImage" />
                <label
                  htmlFor="profileImage"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  {t('registration.basicInfo.fields.profileImage.placeholder')}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileFields.map((field) => (
                field.name === 'phone' ? (
                  <Controller
                    key={field.name}
                    name={field.name as keyof ProfileFormData}
                    control={methods.control}
                    render={({ field: fields }) => (
                      <PhoneInputItem
                        value={fields.value}
                        onChange={fields.onChange}
                        error={methods.formState.errors[field.name]?.message}
                        required={field.required}
                        label={field.label}
                        defaultValue="ma"
                      />
                    )}
                  />) :
                  (<FormInputItem
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
                  />)
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
          </CardContent>
        </Card>
      </form>
    </div>

  );
}