import { useFormContext } from 'react-hook-form'
import { Card, CardContent } from '../ui/card'
import { ParticipantFormData } from '@renderer/utils/schemas/formSchema'
import FormInputItem from '../ui/form-input-item'
import { participantFields } from '@renderer/data/formation-fields-input'

const EditParticipant = (participant): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ParticipantFormData>()
  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {participantFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof ParticipantFormData)}
              value={participant?.participant?.[field.value] || ''}
              error={errors[field.name]?.message}
              required={field.required}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EditParticipant
