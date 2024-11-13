import { useFormContext } from 'react-hook-form'
import type { OrganizationFormData } from '../../utils/schemas/formSchema'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useTranslate } from '@renderer/hooks/useTranslate'
import FormInputItem from '../ui/form-input-item'
import { fields } from '@renderer/data/organinzation-fields-input'
import { Button } from '../ui/button'

export const OrganizationBasicInfo = (organization): JSX.Element => {
  const { t } = useTranslate();
  const {
    register,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  return (
    <Card className="">
      <CardHeader className="text-lg text-gray-950 font-bold mb-6">
        {t('registration.basicInfo.title')}
      </CardHeader>
      <CardContent className="">
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
        <Button className="custom-button bg-blue-600">
          {t('buttons.save')}
        </Button>
      </CardContent>
    </Card>
  );
};
