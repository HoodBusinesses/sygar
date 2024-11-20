import { zodResolver } from '@hookform/resolvers/zod';
import {
  ParticipantFormData,
  participantSchema,
} from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function useHandelEditParticipant(defaultValues: ParticipantFormData, crud: string) {
  const schema = participantSchema

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: FormData) => {
    console.log('data :::', defaultValues);
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, ...values } = defaultValues;
      console.log('data : ', data);
      console.log('defaultValues jjjj: ', values);
      return JSON.stringify(data) !== JSON.stringify(values);
    }
    console.log('hhhhhh : ', data);
    return Object.values(data).filter((value) => value !== '').length > 0;
  };

  // console.log('form state :::', methods.getValues());
  const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

  return {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  };
}
