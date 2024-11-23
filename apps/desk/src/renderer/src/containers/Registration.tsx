import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card';
import FormInputItem from '@renderer/components/ui/form-input-item';
import { usersFields } from '@renderer/data/formation-fields-input';
import { registrationFields, userFields } from '@renderer/data/organinzation-fields-input';
import withAuth from '@renderer/hoc/with-auth';
import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { OrganizationFormData, UserFormData } from '@renderer/utils/schemas/formSchema';
import React from 'react';
import { FaSpinner } from "react-icons/fa";

const Registration: React.FC = () => {
  const { t } = useTranslate();
  // get members , form provider method, and submit handler
  const {methods, isPending, handleSubmit } = useRegistrations();

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className="flex flex-col gap-6">
          <CardHeader className="text-lg text-gray-950 font-semibold mb-6">
            {t('registration.registration')}
            <span className="text-sm rounded-sm bg-blue-100 text-green-600">
              {t('registration.title')}
            </span>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-12 mb-6">
              {registrationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(
                    field.name as keyof OrganizationFormData
                  )}
                  value={''}
                  error={methods.formState.errors[field.name]?.message}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className='flex flex-col p-5 gap-6'>
          <CardHeader className="text-gray-700 text-lg font-semibold">
            {('OWNER INFOS')}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-12 mb-6">
              {usersFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(field.name as keyof UserFormData)}
                  value={''}
                  error={methods.formState.errors[field.name]?.message}
                  isLargeInput={true}
                  required={field.required}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Button
          type="submit"
          className="custom-button bg-blue-600"
          disabled={isPending}
        >
          {isPending ? <FaSpinner className='' /> : t('buttons.save')}
        </Button>
      </form>
    </div>
  );
};

export default withAuth(Registration);
