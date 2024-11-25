import CostumInputItem from '@/components/ui/custom-input-item';
import { personalSchema } from '@/lib/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface PersonalInfosProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const PersonalInfosForm: React.FC<PersonalInfosProps> = ({
  setStep,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(personalSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <CostumInputItem
          label="First Name"
          placeholder="Enter First Name"
          register={register('firstName', {
            required: 'First Name is required',
          })}
          isPending={false}
          error={errors.firstName?.message?.toString()}
          id="firstName"
          type="text"
        />

        <CostumInputItem
          label="Last Name"
          placeholder="Enter Last Name"
          register={register('lastName', { required: 'Last Name is required' })}
          isPending={false}
          error={errors.lastName?.message?.toString()}
          id="lastName"
          type="text"
        />

        <CostumInputItem
          label="Email"
          placeholder="Enter Email"
          register={register('email', {
            required: 'Email is required',
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          })}
          isPending={false}
          error={errors.email?.message?.toString()}
          id="email"
          type="email"
        />

        <CostumInputItem
          label="Phone Number"
          placeholder="Enter Phone Number"
          register={register('phoneNumber', {
            required: 'Phone Number is required',
          })}
          isPending={false}
          error={errors.phoneNumber?.message?.toString()}
          id="phoneNumber"
          type="tel"
        />

        {/* Add the new fields here */}
        <CostumInputItem
          label="Identity Type"
          placeholder="Enter Identity Type (CIN, PERMIS, PASSPORT)"
          register={register('identityType', {
            required: 'Identity Type is required',
          })}
          isPending={false}
          error={errors.identityType?.message?.toString()}
          id="identityType"
          type="text"
        />

        <CostumInputItem
          label="Identity"
          placeholder="Enter Identity Number"
          register={register('identity', { required: 'Identity is required' })}
          isPending={false}
          error={errors.identity?.message?.toString()}
          id="identity"
          type="text"
        />

        <CostumInputItem
          label="CNSS"
          placeholder="Enter CNSS Number"
          register={register('cnss', { required: 'CNSS is required' })}
          isPending={false}
          error={errors.cnss?.message?.toString()}
          id="cnss"
          type="text"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input type="file" className="mt-3 w-full" />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setStep(1)}
          className="w-full bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default PersonalInfosForm;
