import { formationFields } from '@renderer/data/formation-fields-input';
import useHandelEditFormation from '@renderer/hooks/editForms/useHandelEditFormation';
import { useTranslate } from '@renderer/hooks/useTranslate';
import {
  FormationFormData,
  ParticipantFormData
} from '@renderer/utils/schemas/formSchema';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import FormInputItem from '../ui/form-input-item';
import UnsavedChangeEdit from '../unsaved-change-edit';
import { Theme } from './themes-columns';

interface EditFormationProps {
  crud: string;
  defaultValues: Theme | null;
  goBack: () => void;
}

const EditFormation = ({
  crud,
  defaultValues,
  goBack,
}: EditFormationProps): JSX.Element => {
  const { t } = useTranslate();

  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  } = useHandelEditFormation(defaultValues, crud);

  // const methods = useForm();

  console.log('defaultValue : ', defaultValues);

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form className="space-y-6" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Card className="flex flex-col p-5 gap-6">
          <CardHeader className="text-gray-700 text-lg font-semibold">
            {t(`formation.${crud}Formation`)}
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-12 mb-6">
              {formationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(
                    field.name as keyof FormationFormData
                  )}
                  type={field.type}
                  value={
                    (defaultValues &&
                      crud == 'edit' &&
                      defaultValues[field.name]) ||
                    ''
                  }
                  error={methods.formState.errors[field.name]?.message}
                  required={field.required}
                  isLargeInput={true}
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

export default EditFormation;
