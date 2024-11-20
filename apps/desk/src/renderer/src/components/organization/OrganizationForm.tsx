'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

// Define Zod schema for validation // rs -- ice. -- cnss -- address -
const organizationSchema = z.object({
  rs: z.string().min(1, 'RS is required'),
  ice: z.string().min(1, 'ICE is required'),
  cnss: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  logo: z.string().optional(),
});

type OrganizationFormInputs = z.infer<typeof organizationSchema>;

const OrganizationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormInputs>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = (data: OrganizationFormInputs) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Organization Informations</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <Input
          {...register('rs')}
          placeholder="Enter the organization RS"
          className={`border p-2 rounded ${errors.rs ? 'border-red-500' : ''}`}
        />
        {errors.rs && <p className="text-red-500">{errors.rs.message}</p>}

        <Input
          {...register('ice')}
          placeholder="Enter the organization ICE"
          className={`border p-2 rounded ${errors.ice ? 'border-red-500' : ''}`}
        />
        {errors.ice && <p className="text-red-500">{errors.ice.message}</p>}

        <Input
          {...register('cnss')}
          placeholder="Enter the organization CNSS"
          className="border p-2 rounded"
        />

        <Input
          {...register('address')}
          placeholder="Enter the address of organization"
          className={`border p-2 rounded ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
        <div>
          <label className="block mb-2">Company Logo</label>
          <Input type="file" className="border p-2 rounded" />
        </div>

        <Button type="submit" className="col-span-2 mt-4">
          Save
        </Button>
      </form>
    </div>
  );
};

export default OrganizationForm;
