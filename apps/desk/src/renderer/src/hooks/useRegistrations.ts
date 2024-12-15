import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@renderer/store/hooks';
import {
  OrganizationFormData,
  organizationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useForm } from 'react-hook-form';
import { OrganizationsData } from './api/organization/get-all-organizations';
import useUpdateOrg from './api/organization/update-org';

export default function useRegistrations(data: OrganizationsData) {
  const orgId = useAppSelector((state) => state.auth.auth.organizationId);
  
  const defaultValues = {
    rs: data.name,
    cnss: data.cnss,
    address: data.address,
    ice: data.ice,
  };

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  const updateMutation = useUpdateOrg();

  const handleSubmit = (data: OrganizationFormData) => {
     if (defaultValues) {
       updateMutation.mutate({
         orgId,
         data: {
           name: defaultValues.rs !== data.rs ? data.rs : undefined,
           cnss: defaultValues.cnss !== data.cnss ? data.cnss : undefined,
           address:
             defaultValues.address !== data.address ? data.address : undefined,
           ice: defaultValues.ice !== data.ice ? data.ice : undefined,
         },
       });
     }
  };

  return {
    methods,
    isSuccess: updateMutation.isSuccess,
    isError: updateMutation.isError,
    isPending: updateMutation.isPending,
    defaultValues,
    handleSubmit,
  };
}
