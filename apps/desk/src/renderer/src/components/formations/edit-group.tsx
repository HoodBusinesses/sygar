import { Card, CardContent, CardHeader } from '../ui/card';
import { GroupFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { groupFields } from '@renderer/data/formation-fields-input';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Button } from '../ui/button';
import UnsavedChangeEdit from '../unsaved-change-edit';
import useHandelEditGroup from '@renderer/hooks/editForms/useHandleEditGroup';
import { Group } from './groups-columns';

interface EditGroupProps {
  crud: string;
  defaultValues: Group | null;
  goBack: () => void;
}

const EditGroup = ({ crud, defaultValues, goBack }: EditGroupProps): JSX.Element => {
  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  } = useHandelEditGroup(defaultValues, crud)
  const { t } = useTranslate();

  console.log("defaultValue : ", defaultValues);
  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form className='space-y-6'
        onSubmit={methods.handleSubmit(handleSubmit)}
      >

        <Card className="flex flex-col p-5 gap-6">
          <CardHeader className="text-gray-700 text-xl">
            {t(`group.${crud}Group`)}
          </CardHeader>

          <CardContent className="">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {groupFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(field.name as keyof GroupFormData)}
                  value={(defaultValues && crud == 'edit' && defaultValues[field.name]) || ''}
                  error={methods.formState.errors[field.name]?.message}
                  isLargeInput={true}
                  required={field.required}
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
            ConfermFn={goBack}
            KeepEditFn={setOpenUnsavedChange.bind(null, false)}
          />
        </Card>
      </form>
    </div>
  );
};

export default EditGroup;
