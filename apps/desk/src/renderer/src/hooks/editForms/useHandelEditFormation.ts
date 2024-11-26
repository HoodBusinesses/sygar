import { zodResolver } from '@hookform/resolvers/zod';
import { Theme } from '@renderer/components/formations/themes-columns';
import {
  FormationFormData,
  formationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useCreateTheme from '../api/theme/create-theme';
import useUpdateTheme from '../api/theme/update-theme';

export default function   useHandelEditFormation(
  defaultValues: Theme | null,
  crud: string,
  goBack: () => void
) {
  const schema = formationSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createMuation = useCreateTheme({
    onSettled: () => {
      goBack();
    },
  });

  const updateMuation = useUpdateTheme({
    onSettled: () => {
      goBack();
    },
  });

  const handleSubmit = (data: FormData) => {
    crud == 'edit'
      ? updateMuation.mutate({
          uid: defaultValues?.id || '',
          data: {
            description: 'Descrition of the theme',
          },
        })
      : createMuation.mutate({
          name: data.name,
          description: 'Descrition of the theme',
          cost: Number(data.price),
          organizationId: 'asod',
          startDate: Date.now(),
          endDate: Date.now(),
        });
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, ...values } = defaultValues;
      return JSON.stringify(data) !== JSON.stringify(values);
    }
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
