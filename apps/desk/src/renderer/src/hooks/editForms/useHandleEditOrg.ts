import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@renderer/components/organization/Organization-columns';
import {
  organizationSchema
} from '@renderer/utils/schemas/formSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useUpdateOrg from '../api/update-org';

export default function useHandelEditOrgs(defaultValues: Organization | null, goBack: () => void) {
  const schema = organizationSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const updateMuation = useUpdateOrg({
    onSettled: () => {
      goBack();
    },
  });

  const handleSubmit = (data: FormData) => {
    updateMuation.mutate({
      cnss: data.cnss,
      data: {
        name: data.name,
      },
    });
  };

  const handleUnsavedChange = (data: FormData) => {
    // check if there is an empty field
    if (defaultValues) {
      const { id, ...values } = defaultValues;
      console.log('data : ', data);
      console.log('defaultValues jjjj: ', values);
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
