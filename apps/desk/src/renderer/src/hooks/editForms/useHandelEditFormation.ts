import { zodResolver } from '@hookform/resolvers/zod';
import { Theme } from '@renderer/components/formations/themes-columns';
import {
  formationSchema,
} from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useCreateTheme from '../api/theme/create-theme';
import useUpdateTheme from '../api/theme/update-theme';
import { areObjectsEqual } from '@renderer/utils/is-objects-equal';

export default function   useHandelEditFormation(
  defaultValues: Theme | null,
  crud: string,
  orgId: string,
  goBack: () => void
) {
  const schema = formationSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createMuation = useCreateTheme(orgId,{
    onSettled: () => {
      goBack();
    },
  });

  const updateMuation = useUpdateTheme(orgId, {
    onSettled: () => {
      goBack();
    },
  });

  const handleSubmit = (data: FormData) => {
    crud == 'edit'
      ? updateMuation.mutate({
          uid: defaultValues?.id || '',
          data: {
            name:
              defaultValues && defaultValues.name !== data.name
                ? data.name
                : undefined,
            price:
              defaultValues && defaultValues.price !== data.price
                ? data.price
                : undefined,
            year:
              defaultValues && defaultValues.year !== data.year
                ? data.year.toString()
                : undefined,
            organizationId: orgId,
          },
        })
      : createMuation.mutate({
          organizationId: orgId,
          name: data.name,
          price: data.price,
          year: data.year.toString(),
        });
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues && crud == 'edit') {
      const { id, ...values } = defaultValues;
      return !areObjectsEqual(data, values);
    }
    return false
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
