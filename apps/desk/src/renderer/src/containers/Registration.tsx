import { FileUpload } from '@renderer/components/FileUpload';
import { OrganizationBasicInfo } from '@renderer/components/organization/OrganizationBasicInfo';
import withAuth from '@renderer/hoc/with-auth';
import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
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
      <FormProvider {...methods}>
        <p className="text-2xl text-gray-950 font-semibold mb-6">
          {t('registration.registration')}
          <span className="text-green-600 bg-green-100 text-sm font-normal px-4">
            {t('registration.title')}
          </span>
        </p>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-wrap justify-between"
        >
          <div className="w-full pr-10">
            <OrganizationBasicInfo organization={organization} />
          </div>
          {/* <div className="w-1/3 pl-10 pr-10 ">
            <FileUpload />
          </div> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default withAuth(Registration);
