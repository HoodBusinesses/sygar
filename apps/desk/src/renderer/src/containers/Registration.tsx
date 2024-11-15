import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import withAuth from '@renderer/hoc/with-auth';
import { AddMemberForm } from '@renderer/components/AddMemberForm';
import { membersColumn } from '@renderer/components/membersColumn';
import { OrganizationBasicInfo } from '@renderer/components/organization/OrganizationBasicInfo';
import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';
import { useOrganizationData } from '@renderer/hooks/api/get-organization-data';
import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { CustomTable } from '@renderer/components/custom-table';
import { mockMember } from '@renderer/utils/static/organizations';

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
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <OrganizationBasicInfo organization={organization} />

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-950">{t('registration.title')}</h2>
                <Button variant="default">{t('buttons.import')}</Button>
              </div>
              <CustomTable headTitle='registration.title'  columns={membersColumn()} data={mockMember} />
              <AddMemberForm
                onSubmit={
                  editingMember
                    ? (data) =>
                        memberOperations.handleUpdate(data, editingMember.index)
                    : memberOperations.handleAdd
                }
                initialData={editingMember?.data}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full custom-button bg-blue-500 sm:w-auto"
            >
              {t('buttons.save')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default withAuth(Registration);
