import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { FormationFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { formationFields } from '@renderer/data/formation-fields-input';

const EditFormation = (): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormationFormData>();
  return (
    <Card className="">
      <CardHeader className="text-gray-700 text-lg font-semibold">
        Formation Info :
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-3 gap-12 mb-6">
          {formationFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof FormationFormData)}
              value={''}
              error={errors[field.name]?.message}
              required={field.required}
              isLargeInput={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditFormation;
