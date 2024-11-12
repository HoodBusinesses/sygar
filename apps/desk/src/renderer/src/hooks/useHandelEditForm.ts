import { zodResolver } from '@hookform/resolvers/zod';
import {
  formationSchema,
  groupSchema,
  participantSchema,
} from '@renderer/utils/schemas/formSchema';
import { mockGroups, mockParticipant, mockThemes, nullMockGroups, nullMockParticipants, nullMockThemes } from '@renderer/utils/static/organizations';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function useHandelEditForm() {
  const url = new URLSearchParams(window.location.search);

  const type = url.get('type');

  const crud = url.get('crud');

  const rowId = url.get('rowId');

  const mockData =
    type === 'themes'
      ? mockThemes
      : type === 'group'
        ? mockGroups
        : mockParticipant;

  const nullMockData = type === 'themes'
    ? nullMockThemes
    : type === 'group'
      ? nullMockGroups
      : nullMockParticipants;

  const defaultValues = rowId && crud == 'edit' ? mockData.find((item) => item.id.toString() === rowId) : nullMockData

  // console.log('defaultValues :::', defaultValues);

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
    if (defaultValues && rowId && crud == 'edit') {
      const { id, ...values } = defaultValues;
      console.log("data : ", data);
      console.log("defaultValues : ", values);
      return JSON.stringify(data) !== JSON.stringify(values);
    }
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
    type,
    crud,
    defaultValues
  };
}
