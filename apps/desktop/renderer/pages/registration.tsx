"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { OrganizationBasicInfo } from "../components/OrganizationBasicInfo";
import { MembersTable } from "../components/MembersTable";
import { AddMemberForm } from "../components/AddMemberForm";
import ConfirmationModal from "../pages/ConfirmationModal ";
import {
  organizationSchema,
  type OrganizationFormData,
  type MemberFormData,
} from "../schemas/organization";
import { useToast } from "../components/ui/use-toast";

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
  const [members, setMembers] = useState<MemberFormData[]>(staticMembers);
  const [editingMember, setEditingMember] = useState<{
    index: number;
    data: MemberFormData;
  } | null>(null);
  const { toast } = useToast();

  const [isModalOpen, setModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      console.log({ ...data, members });
      toast({
        title: "Success",
        description: "Organization information saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save organization information",
        variant: "destructive",
      });
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

  const handleDeleteMemberClick = (index: number) => {
    setMemberToDelete(index);
    setModalOpen(true); // Open the modal
  };

  const handleConfirmDelete = () => {
    if (memberToDelete !== null) {
      setMembers(members.filter((_, i) => i !== memberToDelete));
      setMemberToDelete(null);
    }
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      <div
        className={`ml-64 p-6 transition-all duration-300 ${isModalOpen ? "bg-gray-200 opacity-50" : "bg-white"}`}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <OrganizationBasicInfo />

            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-lg text-gray-950 font-bold mb-6">
                    Organization Members Informations
                  </p>
                  <Button type="submit">Import</Button>
                </div>

                <MembersTable
                  members={members}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMemberClick}
                />

                <div className="mt-6">
                  <AddMemberForm
                    onSubmit={handleAddMember}
                    initialData={editingMember?.data}
                  />
                </div>
              </CardContent>
            </Card>

            <Button className="btn-blue" type="submit">
              Save
            </Button>
          </form>
        </FormProvider>
      </div>
      <ConfirmationModal
        title="Discard Unsaved Changes?"
        message="Any unsaved changes will be lost. Are you sure you want to cancel and discard your edits?"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default RegistrationPage;
