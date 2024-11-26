import { Button } from "@/components/ui/button";
import CostumInputItem from "@/components/ui/custom-input-item";
import FormInputItem from "@/components/ui/form-input-item";
import { organizationSchema, orgType } from "@/lib/schema/schema";
import { registrationFields } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface OrgInfosProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (data: any) => void;
}

const OrgInfosForm: React.FC<OrgInfosProps> = ({ setStep, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(organizationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Organization Information
      </h2>
      <div className="grid grid-cols-3 gap-4">
              {/* {registrationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={register(
                    field.name as keyof orgType
                  )}
                  value={''}
                  error={formState.errors[field.name]?.message?.toString()}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))} */}
      <CostumInputItem
        label="RS"
        placeholder="Enter RS"
        register={register('rs', { required: 'RS is required' })}
        isPending={false}
        error={errors.rs?.message?.toString()}
        id="rs"
        type="text"
      />

      <CostumInputItem
        label="ICE"
        placeholder="Enter ICE"
        register={register('ice', { required: 'ICE is required' })}
        isPending={false}
        error={errors.ice?.message?.toString()}
        id="ice"
        type="text"
      />

      <CostumInputItem
        label="CNSS"
        placeholder="Enter CNSS"
        register={register('cnss', { required: 'CNSS is required' })}
        isPending={false}
        error={errors.cnss?.message?.toString()}
        id="cnss"
        type="text"
      />

      <CostumInputItem
        label="Address"
        placeholder="Enter Address"
        register={register('address', { required: 'Address is required' })}
        isPending={false}
        error={errors.address?.message?.toString()}
        id="address"
        type="text"
      />
      
      <div>
      <label className="block text-sm font-medium text-gray-700">Logo</label>
      <input
      type="file"
      className="mt-1 w-full"
      onChange={(e) => setValue('logo', e.target.files?.[0])}
      />
      </div>
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
