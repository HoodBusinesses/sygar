'use client'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MemberFormData, OrganizationFormData, organizationSchema } from '../schemas/organization';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MembersTable } from '../components/MembersTable';
import { AddMemberForm } from '../components/AddMemberForm';
import { usePermissions } from '../contexts/PermissionsContext';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/ui/use-toast';
import { useRouter } from 'next/router';
import { ThemeBasicInfo } from '../components/ThemeBasicInfo';

const staticMembers: MemberFormData[] = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "manager",
    actionType: "edit",
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    role: "employee",
    actionType: "view",
  },
];
  

export default function Home() {
  const { t } = useTranslation();
  const permissions = usePermissions();
  const [members, setMembers] = useState<MemberFormData[]>(staticMembers);
  const [editingMember, setEditingMember] = useState<{
    index: number;
    data: MemberFormData;
  } | null>(null);
  const { addToast } = useToast();
  const router = useRouter();
  const [organization, setOrganization] = useState(null);

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      // Handle form submission
      console.log({ ...data, members });
      addToast("Success", "Organization information saved successfully");
    } catch (error) {
      addToast("Error", "Failed to save organization information");
    }
  };
  useEffect(() => {
    if (router.query.organization){
      if (typeof router.query.organization === 'string') {
        setOrganization(JSON.parse(router.query.organization));
      }
      console.log("aaaaa : ", organization);
      
      // infoToast('Organization data loaded successfully');
    }
  }, [router.query.organization]);
  const handleAddMember = (data: MemberFormData) => {
    if (editingMember !== null) {
      setMembers(
        members.map((member, i) => (i === editingMember.index ? data : member))
      );
      setEditingMember(null);
    } else {
      setMembers([...members, data]);
    }
  };

  const handleEditMember = (index: number) => {
    setEditingMember({ index, data: members[index] });
  };

  const handleDeleteMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };
  // console.log(organization);
  
  
  if (!permissions.registration?.canModify && !permissions.registration.canView) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-950">
          {t('noPermission')}
        </p>
      </div>
    );
  }
  return (
    <div className=" space-y-6 w-full h-full min-h-screen mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {permissions?.registration?.canModify && 
            <ThemeBasicInfo  />}

          <Card className="p-6 mb-6">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-gray-950 font-bold  mb-6">
                {t('registration.title')}
                </p>
                {permissions?.registration?.canModify &&
                  <Button className="btn-blue" type="submit">
                    {t('registration.buttons.import')}
                  </Button>}
              </div>
              <MembersTable
                members={members}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
              />

              <div className="mt-6">
                {permissions?.registration?.canModify &&
                  <AddMemberForm
                  onSubmit={handleAddMember}
                  initialData={editingMember?.data}
                />}
              </div>
            </CardContent>
          </Card>

          {permissions?.registration?.canModify && <Button 
            className="btn-blue"
            type="submit">{t('registration.buttons.save')}
          </Button>}
        </form>
      </FormProvider>
    </div>
  );
}