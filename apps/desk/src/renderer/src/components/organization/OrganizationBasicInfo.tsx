import type { OrganizationFormData } from '../../utils/schemas/formSchema';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useTranslate } from '@renderer/hooks/useTranslate';
import FormInputItem from '../ui/form-input-item';
import { fields } from '@renderer/data/organinzation-fields-input';
import { Button } from '../ui/button';
import useHandelEditOrgs from '@renderer/hooks/editForms/useHandleEditOrg';
import UnsavedChangeEdit from '../unsaved-change-edit';
import { Organization } from './Organization-columns';

interface EditOrgsProps {
  defaultValues: Organization | null;
  goBack: () => void;
}

export const OrganizationBasicInfo = ({
  defaultValues,
  goBack
}: EditOrgsProps): JSX.Element => {
  const { t } = useTranslate();

  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  } = useHandelEditOrgs(defaultValues, goBack);

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form className="space-y-6" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Card className="flex flex-col p-5 gap-6">
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
                  register={methods.register(
                    field.name as keyof OrganizationFormData
                  )}
                  value={(defaultValues && defaultValues[field.name]) || ''}
                  error={methods.formState.errors[field.name]?.message}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))}
            </div>
          </CardContent>
          <div className="flex self-end gap-8 w-1/2">
            <Button
              type="button"
              className="w-full h-12 bg-transparent border border-blue-500 text-blue-500"
              onClick={() =>
                handleUnsavedChange(methods.getValues())
                  ? setOpenUnsavedChange(true)
                  : goBack()
              }
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white"
            >
              {t('buttons.save')}
            </Button>
          </div>

          <UnsavedChangeEdit
            open={openUnsavedChange}
            ConfermFn={() => {
              console.log('first redir');
              goBack();
            }}
            KeepEditFn={setOpenUnsavedChange.bind(null, false)}
          />
        </Card>
      </form>
    </div>
  );
};
