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

  // const userMethods = useForm<UserFormData>({
  //   resolver: zodResolver(userSchema),
  //   defaultValues: useMemo(
  //     () => ({
  //       // default values
  //     }),
  //     []
  //   ),
  // });

  const createMuation = useCreateOrg();

  const handleSubmit = (data: OrganizationFormData & UserFormData) => {
    // Handle form submission
    console.log('ikhan: ', data);
    // createMuation.mutate({
    //   name: data.rs,
    //   cnss: data.cnss,
    //   freeTrial: 30,
    // });
  };

  return {
    methods,
    isSuccess: createMuation.isSuccess,
    isError: createMuation.isError,
    isPending: createMuation.isPending,
    handleSubmit,
  };
}
