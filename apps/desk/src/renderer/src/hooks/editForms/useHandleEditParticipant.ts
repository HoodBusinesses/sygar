import { zodResolver } from '@hookform/resolvers/zod';
import { Participant } from '@renderer/components/formations/participants-columns';
import { participantSchema } from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useCreateParticipant from '../api/participant/add-participant';
import useUpdateParticipant from '../api/participant/update-participant';
import { areObjectsEqual } from '@renderer/utils/is-objects-equal';

export default function useHandelEditParticipant(
  orgId: string,
  groupId: string,
  defaultValues: Participant | null,
  crud: string,
  goBack: () => void

) {
  const schema = participantSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createMuation = useCreateParticipant(orgId, groupId, {
    onSettled: () => {
      goBack();
    },
  });

  const updateMuation = useUpdateParticipant(orgId, groupId,defaultValues?.id || '', {
    onSettled: () => {
      goBack();
    },
  });

  const handleSubmit = (data: FormData) => {
    crud == 'edit'
      ? updateMuation.mutate({
          firstName:
            defaultValues && data.name !== defaultValues?.name
              ? data.name
              : undefined,
          lastName:
            defaultValues && data.name !== defaultValues?.name
              ? data.name
              : undefined,
          // phone: '+212652497590',
          email:
            defaultValues && data.email !== defaultValues?.email
              ? data.email
              : undefined,
        })
      : createMuation.mutate({
          firstName: data.name,
          lastName: data.name,
          phone: '+212652497590',
          identity: data.cin,
          identityType: 'CIN',
          role: data.status,
          groupId: groupId,
          email: data.email,
          cnss: data.cnss,
        });
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, ...values } = defaultValues;
      return !areObjectsEqual(data, values);
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
