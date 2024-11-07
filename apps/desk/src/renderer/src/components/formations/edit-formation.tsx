import { useFormContext } from 'react-hook-form'
import { Card, CardContent } from '../ui/card'
import { FormationFormData } from '@renderer/utils/schemas/formSchema'
import FormInputItem from '../ui/form-input-item'
import { formationFields } from '@renderer/data/formation-fields-input'

const EditFormation = (formation): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext<FormationFormData>()
  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {formationFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof FormationFormData)}
              value={formation?.formation?.[field.value] || ''}
              error={errors[field.name]?.message}
              required={field.required}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EditFormation
