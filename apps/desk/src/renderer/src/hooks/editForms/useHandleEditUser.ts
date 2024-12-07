import { zodResolver } from '@hookform/resolvers/zod';
import { Users } from '@renderer/components/formations/users-columns';
import { userSchema } from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddUserToOrganization from '../api/organization/add-user-to-organization';
import { useAppSelector } from '@renderer/store/hooks';
import useUpdateUserOfOrganization from '../api/organization/update-user-from-org';
import useUpdateUser from '../api/user/useUpdateUser';
import useCreateSygarUser from '../api/user/create-user';
import { areObjectsEqual } from '@renderer/utils/is-objects-equal';

export default function useHandleEditUser(
  defaultValues: Users | null,
  crud: string,
  goBack: () => void,
  orgId:string
) {
  const schema = userSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const { control, register, handleSubmit, formState, watch } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        firstName: (crud == 'edit' && defaultValues?.firstName) || '',
        lastName: (crud == 'edit' && defaultValues?.lastName) || '',
        email: (crud == 'edit' && defaultValues?.email) || '',
        phone: (crud == 'edit' && defaultValues?.phone) || '',
        role: (crud == 'edit' && defaultValues?.role) || undefined,
        identityType: (crud == 'edit' && defaultValues?.identityType) || '',
        identity: (crud == 'edit' && defaultValues?.identity) || '',
        userCnss: (crud == 'edit' && defaultValues?.userCnss) || '',
      },
    });

  const formValues = watch();

  const userType = useAppSelector((state) => state.auth.auth.userType);

  const mutationCreate = useAddUserToOrganization(orgId, goBack);

  const nutationCreateSygar = useCreateSygarUser();

  const mutationUpdateUser = useUpdateUser();

  const mutationUpdate = useUpdateUserOfOrganization(
    orgId,
    defaultValues?.id || '',
    goBack
  );

  const onSubmit = (data: FormData) => {
    console.log('data :::', data);
    if (userType === 'SOLUTION_OWNER') {
      crud == 'edit'
        ? mutationUpdateUser.mutate({
            userId: defaultValues?.id || '',
            data: {
              firstName:
                defaultValues && defaultValues.firstName !== data.firstName
                  ? data.firstName
                  : undefined,
              lastName:
                defaultValues && defaultValues.lastName !== data.lastName
                  ? data.lastName
                  : undefined,
              email:
                defaultValues && defaultValues.email !== data.email
                  ? data.email
                  : undefined,
              phone:
                defaultValues && defaultValues.phone !== data.phone
                  ? data.phone
                  : undefined,
            },
          })
        : nutationCreateSygar.mutate({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            identityType: data.identityType,
            identity: data.identity,
            role: data.role,
            cnss: data.userCnss,
            phone: data.phone,
          });
    } else {
      crud == 'edit'
        ? mutationUpdate.mutate({
            orgId: orgId,
            data: {
              firstName:
                defaultValues && defaultValues.firstName !== data.firstName
                  ? data.firstName
                  : undefined,
              lastName:
                defaultValues && defaultValues.lastName !== data.lastName
                  ? data.lastName
                  : undefined,
              email:
                defaultValues && defaultValues.email !== data.email
                  ? data.email
                  : undefined,
              identityType:
                defaultValues &&
                defaultValues.identityType !== data.identityType
                  ? data.identityType
                  : undefined,
              identity:
                data.identity === data.identity ? undefined : data.identity,
              role:
                defaultValues && defaultValues.role !== data.role
                  ? data.role
                  : undefined,
              cnss:
                defaultValues && defaultValues.userCnss !== data.userCnss
                  ? data.userCnss
                  : undefined,
              phone:
                defaultValues && defaultValues.phone !== data.phone
                  ? data.phone
                  : undefined,
            },
          })
        : mutationCreate.mutate({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            organizationId: orgId,
            identityType: data.identityType,
            identity: data.identity,
            role: data.role,
            cnss: data.userCnss,
            phone: data.phone,
          });
    }
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, organizationId, ...values } = defaultValues;
      console.log('data : ', data);
      console.log('defaultValues jjjj: ', values);
      return !areObjectsEqual(data, values);
    }
    return false;
  };

  const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

  return {
    openUnsavedChange,
    setOpenUnsavedChange,
    register,
    control,
    formValues,
    formState,
    isPending: false,
    handleSubmit,
    onSubmit,
    handleUnsavedChange,
  };
}
