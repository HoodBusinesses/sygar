import { useFormContext } from 'react-hook-form'
import { Card, CardContent } from '../ui/card'
import { GroupFormData } from '@renderer/utils/schemas/formSchema'
import FormInputItem from '../ui/form-input-item'
import { groupFields } from '@renderer/data/formation-fields-input'

const EditGroup = (group): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GroupFormData>()
  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {groupFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof GroupFormData)}
              value={group?.group?.[field.value] || ''}
              error={errors[field.name]?.message}
              required={field.required}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EditGroup
