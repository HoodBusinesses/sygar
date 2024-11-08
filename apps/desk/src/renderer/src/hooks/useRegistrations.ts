import { zodResolver } from '@hookform/resolvers/zod';
import { INITIAL_MEMBERS } from '@renderer/data/mockData';
import {
  MemberFormData,
  OrganizationFormData,
  organizationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslate } from './useTranslate';
import { useToast } from './useToast';

export default function useRegistrations() {
  const { toast } = useToast();

  const { t } = useTranslate();

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: useMemo(
      () => ({
        // default values
      }),
      []
    ),
  });

  const [members, setMembers] = useState<MemberFormData[]>(INITIAL_MEMBERS);

  const [editingMember, setEditingMember] = useState<{
    index: number;
    data: MemberFormData;
  } | null>(null);

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      // Assuming you have an API endpoint to save the data
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, members }),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: t('success'),
        description: t('registration.messages.saveSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('registration.messages.saveError'),
        variant: 'destructive',
      });
    }
  };

  const memberOperations = useMemo(
    () => ({
      handleAdd: (data: MemberFormData) => {
        setMembers((prev) => [...prev, data]);
        setEditingMember(null);
      },
      handleUpdate: (data: MemberFormData, index: number) => {
        setMembers((prev) =>
          prev.map((member, i) => (i === index ? data : member))
        );
        setEditingMember(null);
      },
      handleEdit: (index: number) =>
        setEditingMember({
          index,
          data: members[index],
        }),
      handleDelete: (index: number) =>
        setMembers((prev) => prev.filter((_, i) => i !== index)),
    }),
    [members]
  );

  return {
    memberOperations,
    editingMember,
    members,
    methods,
    handleSubmit,
  };
}
