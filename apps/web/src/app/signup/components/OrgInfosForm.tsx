import { Button } from "@/components/ui/button";
import CostumInputItem from "@/components/ui/custom-input-item";
import FormInputItem from "@/components/ui/form-input-item";
import { organizationSchema, orgType } from "@/lib/schema/schema";
import { registrationFields } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface OrgInfosProps {
  onSubmit: (data: orgType) => void;
  orgMethods: UseFormReturn<orgType>;
}

const OrgInfosForm: React.FC<OrgInfosProps> = ({
  onSubmit,
  orgMethods,
}) => {

  return (
    <form onSubmit={orgMethods.handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Organization Information
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {registrationFields.map((field) => (
          <FormInputItem
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            register={orgMethods.register(
              field.name as keyof orgType
            )}
            value={''}
            error={orgMethods.formState.errors[field.name as keyof orgType]?.message}
            required={field.required}
            isLogoInput={field.isLogoInput}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="mt-4 text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mt-4"
      >
        Next
      </Button>
    </form>
  );
};

export default OrgInfosForm;
