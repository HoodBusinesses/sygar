import { zodResolver } from '@hookform/resolvers/zod';
import {
  OrganizationFormData,
  organizationSchema,
  UserFormData,
  userSchema,
} from '@renderer/utils/schemas/formSchema';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useCreateOrg from '../api/organization/create-org';

export default function useHandleEditRegAndOwner() {
  const methods = useForm<OrganizationFormData & UserFormData>({
    resolver: zodResolver(organizationSchema.merge(userSchema)),
    defaultValues: useMemo(
      () => ({
        // default values
      }),
      []
    ),
  });

  const createMuation = useCreateOrg();

  const handleSubmit = (data: OrganizationFormData & UserFormData) => {
    console.log('ikhan: ', data);
    createMuation.mutate({
      name: data.rs,
      cnss: data.cnss,
      address: data.address,
      ice: data.ice,
      owner: {
        cnss: data.userCnss,
        identity: data.identity,
        identityType: data.identityType,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      }
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
