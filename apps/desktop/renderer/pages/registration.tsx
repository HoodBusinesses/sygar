"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { OrganizationBasicInfo } from "../components/OrganizationBasicInfo";
import { MembersTable } from "../components/MembersTable";
import { AddMemberForm } from "../components/AddMemberForm";
import {
  organizationSchema,
  type OrganizationFormData,
  type MemberFormData,
} from "../schemas/organization";
import { useToast } from "../components/ui/use-toast";
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from "react-i18next";

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

const RegistrationPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  console.log(language);
  
  const [members, setMembers] = useState<MemberFormData[]>(staticMembers);
  const [editingMember, setEditingMember] = useState<{
    index: number;
    data: MemberFormData;
  } | null>(null);
  const { addToast } = useToast();

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

  return (
    <div className=" space-y-6 w-full h-full min-h-screen mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <OrganizationBasicInfo />

          <Card className="p-6 mb-6">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-gray-950 font-bold  mb-6">
                {t('organization.title')}
                </p>
                <Button className="btn-blue" type="submit">
                  {t('organization.buttons.import')}
                </Button>
              </div>
              <MembersTable
                members={members}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
              />

              <div className="mt-6">
                <AddMemberForm
                  onSubmit={handleAddMember}
                  initialData={editingMember?.data}
                />
              </div>
            </CardContent>
          </Card>

          <Button className="btn-blue" type="submit">{t('organization.buttons.save')}</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegistrationPage;
