import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ParticipantFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { participantFields } from '@renderer/data/formation-fields-input';
import { useTranslate } from '@renderer/hooks/useTranslate';

interface EditParticipantProps {
  crud: string;
}

const EditParticipant = ({ crud }: EditParticipantProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ParticipantFormData>();
  const { t } = useTranslate();
  
  return (
    <Card className="">
      <CardHeader className="text-gray-700 text-xl">
        {t(`participant.${crud}Participant`)}
      </CardHeader>

      <CardContent className="">
        <div className="grid grid-cols-3 gap-3 mb-6">
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
