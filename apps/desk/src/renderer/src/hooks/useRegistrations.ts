import { zodResolver } from '@hookform/resolvers/zod';
import {
  OrganizationFormData,
  organizationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useCreateOrg from './api/create-org';
import useUpdateOrg from './api/update-org';
import { useOrganizationData } from './api/get-organization-data';

export default function useRegistrations() {
  const organizationCnss = useMemo(
    () => new URLSearchParams(window.location.search).get('organizationCnss'),
    []
  );

  // get organization data

  const {
    data: organization,
    error,
    isLoading,
  } = organizationCnss ?useOrganizationData(organizationCnss) : { data: undefined, error: null, isLoading: false };

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

  const updateMuation = useUpdateOrg();

  const handleSubmit = (data: OrganizationFormData) => {
    // Handle form submission
    console.log(data);
    return organizationCnss
      ? updateMuation.mutate({
          cnss: organizationCnss,
          data: {
            name: data.name,
          },
        })
      : createMuation.mutate({
          name: data.name,
          cnss: data.cnss,
          freeTrial: 30,
        });
  };

  return {
    organization,
    error,
    isLoading,
    methods,
    handleSubmit,
  };
}