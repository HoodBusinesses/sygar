import { zodResolver } from '@hookform/resolvers/zod';
import {
  OrganizationFormData,
  organizationSchema
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

  const muation = useCreateOrg();

  const handleSubmit = (data: OrganizationFormData) => {
    // Handle form submission
    muation.mutate({
      name: data.name,
      cnss: data.cnss,
      freeTrial: 30,
    });
    console.log(data)
  };


    const test = async () => {
      // Handle form submission
      muation.mutate({
        name: 'said org',
        cnss: 'cnss 1324',
        freeTrial: 30,
      });
    };
  return {
    methods,
    test,
    handleSubmit,
  };
}
