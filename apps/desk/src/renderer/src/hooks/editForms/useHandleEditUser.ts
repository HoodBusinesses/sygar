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

export function areObjectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  // If both are the same reference, they are equal
  if (obj1 === obj2) return true;

  // If either is not an object or is null, they are not equal
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // Get keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If they have a different number of keys, they are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare keys and values recursively
  for (const key of keys1) {
    // Check if the key exists in both objects and their values are equal
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export default function useHandleEditUser(
  defaultValues: Users | null,
  crud: string,
  goBack: () => void
) {
  const schema = userSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const orgId = useAppSelector((state) => state.auth.auth.organizationId);

  const userType = useAppSelector((state) => state.auth.auth.userType);

  const mutationCreate = useAddUserToOrganization(orgId, goBack);
  const nutationCreateSygar = useCreateSygarUser();

  const mutationUpdateUser = useUpdateUser();
  const mutationUpdate = useUpdateUserOfOrganization(
    orgId,
    defaultValues?.id || '',
    goBack
  );

  const handleSubmit = (data: FormData) => {
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
      return !areObjectsEqual(data, values);
    }
    return false;
  };

  const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

  return {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    isPending: false,
    handleSubmit,
    handleUnsavedChange,
  };
}
