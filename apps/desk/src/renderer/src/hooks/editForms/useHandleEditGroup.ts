import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@renderer/components/formations/groups-columns';
import { groupSchema } from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useCreateGroup from '../api/group/add-group';
import useUpdateGroup from '../api/group/update-group';

export default function useHandelEditGroup(
  defaultValues: Group | null,
  crud: string,
  themeId: string,
  organizationId: string,
  goBack: () => void
) {
  const schema = groupSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createMutation = useCreateGroup(organizationId, themeId, goBack);

  const updateMutation = useUpdateGroup(organizationId, themeId, goBack);

  const handleSubmit = (data: FormData) => {
    crud == 'edit'
      ? updateMutation.mutate({
          groupId: defaultValues!.id,
          data: {
            trainerName:
              defaultValues!.trainer !== data.trainer
                ? data.trainer
                : undefined,
            animatorName:
              defaultValues!.facilator !== data.facilator
                ? data.facilator
                : undefined,
            address:
              defaultValues!.location !== data.location
                ? data.location
                : undefined,
            organizationId,
          },
        })
      : createMutation.mutate({
          trainerName: data.trainer,
          animatorName: data.facilator,
          address: data.location,
          organizationId,
          themeId,
        });
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, date, ...values } = defaultValues;
      console.log('data : ', data);
      console.log('defaultValues jjjj: ', values);
      return JSON.stringify(data) !== JSON.stringify(values);
    }
    return false;
  };

  const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

  return {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  };
}
