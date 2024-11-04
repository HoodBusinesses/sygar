import { useFormContext } from 'react-hook-form'
import type { OrganizationFormData } from '../../utils/schemas/organization'
import { Card, CardContent } from '../ui/card'
import { useTranslate } from '@renderer/hooks/useTranslate'
import FormInputItem from '../ui/form-input-item'
import { fields } from '@renderer/data/organinzation-fields-input'

export const OrganizationBasicInfo = (organization): JSX.Element => {
  const { t } = useTranslate()
  const {
    register,
    formState: { errors }
  } = useFormContext<OrganizationFormData>()

  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <p className="text-lg text-gray-950 font-bold mb-6">{t('registration.basicInfo.title')}</p>

        <div className="grid grid-cols-3 gap-4 mb-6 ">
          {fields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof OrganizationFormData)}
              value={organization?.organization?.[field.value] || ''}
              error={errors[field.name]?.message}
              required={field.required}
              isLogoInput={field.isLogoInput}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
