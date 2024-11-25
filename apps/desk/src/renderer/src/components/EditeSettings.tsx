import useRegistrations from '@renderer/hooks/useRegistrations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Card, CardContent, CardHeader } from './ui/card';
import { OrganizationFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from './ui/form-input-item';
import { registrationFields } from '@renderer/data/organinzation-fields-input';
import { Button } from './ui/button';
import { FaSpinner } from 'react-icons/fa';
import { OrganizationsData } from '@renderer/hooks/api/organization/get-all-organizations';

export default function EditeSettings({ data }: { data: OrganizationsData }) {
  const { methods, isPending, handleSubmit, defaultValues } =
    useRegistrations(data);
  const { t } = useTranslate();

  return (
    <div className="p-4  py-6 space-y-6 w-screen h-screen">
      <h1 className="text-2xl font-semibold text-gray-950">
        {t('registration.EditOrganization')}
      </h1>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className="flex flex-col gap-4 ">
          <CardHeader className="text-sm rounded-sm text-green-600 bg-green-100 font-bold  p-0 w-fit">
            {t('registration.title')}
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-4">
              {registrationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(
                    field.name as keyof OrganizationFormData
                  )}
                  value={
                    defaultValues[field.name as keyof OrganizationFormData] ??
                    ''
                  }
                  error={methods.formState.errors[field.name]?.message}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Button
          type="submit"
          className="custom-button bg-blue-600"
          disabled={isPending}
        >
          {isPending ? <FaSpinner className="" /> : t('buttons.save')}
        </Button>
      </form>
    </div>
  );
}
