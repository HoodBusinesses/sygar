import { zodResolver } from '@hookform/resolvers/zod';
import {
  formationSchema,
  groupSchema,
  participantSchema,
} from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function useHandelEditForm() {
  const url = new URLSearchParams(window.location.search);

  const type = url.get('type');

  const crud = url.get('crud');

  const schema =
    type === 'themes'
      ? formationSchema
      : type === 'group'
        ? groupSchema
        : participantSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: FormData) => {
    console.log('data :::', data);
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    return Object.values(data).filter((value) => value !== '').length > 0;
  };

  const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

  return {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
    type,
    crud,
  };
}
