import { FileUpload } from '@renderer/components/FileUpload';
import { OrganizationBasicInfo } from '@renderer/components/organization/OrganizationBasicInfo';
import withAuth from '@renderer/hoc/with-auth';
import { useOrganizationData } from '@renderer/hooks/api/get-organization-data';
import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

const Registration: React.FC = () => {
  const { t } = useTranslate();

  const organizationId = useMemo(
    () => new URLSearchParams(window.location.search).get('organization'),
    []
  );

  // get organization data
  const {
    data: organization,
    error,
    isLoading,
  } = useOrganizationData(organizationId);
  // get members , form provider method, and submit handler
  const { memberOperations, editingMember, members, methods, handleSubmit } =
    useRegistrations();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );

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
          <div className="w-2/3 pr-10">
            <OrganizationBasicInfo organization={organization} />
          </div>
          <div className="w-1/3 pl-10 pr-10 ">
            <FileUpload />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default withAuth(Registration);