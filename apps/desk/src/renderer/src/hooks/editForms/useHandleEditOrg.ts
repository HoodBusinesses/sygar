import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@renderer/components/organization/Organization-columns';
import { organizationSchema } from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useUpdateOrg from '../api/organization/update-org';

export default function useHandelEditOrgs(
  defaultValues: Organization | null,
  goBack: () => void
) {
  const schema = organizationSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const updateMutation = useUpdateOrg({
    onSettled: () => {
      goBack();
    },
  });

  const handleSubmit = (data: FormData) => {
    if (defaultValues) {
      updateMutation.mutate({
        orgId: defaultValues.id,
        data: {
          name: data.rs,
        },
      });
    }
  };

  const handleUnsavedChange = (data: FormData) => {
    if (defaultValues) {
      const { id, enabled, logo, ...values } = defaultValues;
      const { logo: imageData, ...defaultData } = data;
      console.log('Data:', data);
      console.log('Default Values:', values);
      return JSON.stringify(defaultData) !== JSON.stringify(values);
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
