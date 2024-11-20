import { FileUpload } from '@renderer/components/FileUpload';
import { OrganizationBasicInfo } from '@renderer/components/organization/OrganizationBasicInfo';
import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card';
import FormInputItem from '@renderer/components/ui/form-input-item';
import { registrationFields } from '@renderer/data/organinzation-fields-input';
import withAuth from '@renderer/hoc/with-auth';
import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { OrganizationFormData } from '@renderer/utils/schemas/formSchema';
import React from 'react';
import { FormProvider } from 'react-hook-form';

const Registration: React.FC = () => {
  const { t } = useTranslate();
  // get members , form provider method, and submit handler
  const { methods, handleSubmit, organization, isLoading, error } = useRegistrations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form onSubmit={methods.handleSubmit(handleSubmit)} className='space-y-6'>
        <Card className='flex flex-col gap-6'>

          <CardHeader className="text-lg text-gray-950 font-semibold mb-6">
            {t('registration.registration')}
            <span className="text-sm rounded-sm bg-blue-100 text-green-600">
              {t('registration.title')}
            </span>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {registrationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(field.name as keyof OrganizationFormData)}
                  value={organization && organization[field.name] || ''}
                  error={methods.formState.errors[field.name]?.message}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))}
            </div>
              <Button className="custom-button bg-blue-600">
                {t('buttons.save')}
              </Button>
          </CardContent>
        </Card>
      </form>
      {/* <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-wrap justify-between"
        >
          <div className="w-full pr-10">
            <OrganizationBasicInfo organization={registrationFields} />
          </div>
          <div className="w-1/3 pl-10 pr-10 ">
            <FileUpload />
          </div>
        </form> */}
    </div>
  );
};

export default withAuth(Registration);
