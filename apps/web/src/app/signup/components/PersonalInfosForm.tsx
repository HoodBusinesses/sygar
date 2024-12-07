import { Button } from '@/components/ui/button';
import CostumInputItem from '@/components/ui/custom-input-item';
import FormInputItem from '@/components/ui/form-input-item';
import { ownerType, personalSchema } from '@/lib/schema/schema';
import { PersonalInfosFields } from '@/utils/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from 'lucide-react';
import { useForm, UseFormReturn } from 'react-hook-form';

interface PersonalInfosProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (data: ownerType) => void;
  isLoading: boolean;
  personMethods: UseFormReturn<ownerType>;
}

const PersonalInfosForm: React.FC<PersonalInfosProps> = ({
  onSubmit,
  isLoading,
  setStep,
  personMethods,

}) => {

  return (
    <form onSubmit={personMethods.handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-3 gap-4">

        {PersonalInfosFields.map((field) => (
          <FormInputItem
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            register={personMethods.register(
              field.name as keyof ownerType)
            }
            value={''}
            error={personMethods.formState.errors[field.name as keyof ownerType]?.message}
            required={field.required}
            isLogoInput={field.isLogoInput}
            isSelect={field.isSelect}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => setStep(1)}
          className="w-full bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfosForm;
