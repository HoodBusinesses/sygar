import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@renderer/components/formations/groups-columns';
import { groupSchema } from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function useHandelEditGroup(
  defaultValues: Group | null,
  crud: string
) {
  const schema = groupSchema;

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
