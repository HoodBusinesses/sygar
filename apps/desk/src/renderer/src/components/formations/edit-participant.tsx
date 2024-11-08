import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ParticipantFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { participantFields } from '@renderer/data/formation-fields-input';

const EditParticipant = (): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ParticipantFormData>();
  console.log('PP errors :::', errors);
  return (
    <Card className="">
      <CardHeader className="text-gray-700 text-xl">
        Formation Info :
      </CardHeader>

      <CardContent className="">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {participantFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof ParticipantFormData)}
              value={''}
              error={errors[field.name]?.message}
              isLargeInput={true}
              required={field.required}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditParticipant;
