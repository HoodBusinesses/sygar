import { zodResolver } from '@hookform/resolvers/zod';
import {
  OrganizationFormData,
  organizationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useCreateOrg from './api/create-org';

export default function useRegistrations() {
  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: useMemo(
      () => ({
        // default values
      }),
      []
    ),
  });

  const createMuation = useCreateOrg();

  const handleSubmit = (data: OrganizationFormData) => {
    // Handle form submission
    console.log('ikhan: ', data);
    createMuation.mutate({
      name: data.rs,
      cnss: data.cnss,
      freeTrial: 30,
    });
  };

  return {
    methods,
    isSuccess: createMuation.isSuccess,
    isError: createMuation.isError,
    isPending: createMuation.isPending,
    handleSubmit,
  };
}
