import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card';
import FormInputItem from '@renderer/components/ui/form-input-item';
import { usersFields } from '@renderer/data/formation-fields-input';
import useHandleEditUser from '@renderer/hooks/editForms/useHandleEditUser';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { UserFormData } from '@renderer/utils/schemas/formSchema';
import { Controller } from 'react-hook-form';
import UnsavedChangeEdit from '../unsaved-change-edit';
import MainSelect from '../ui/main-select';
import { Users } from './users-columns';
import PhoneInputItem from '../ui/phone-input-item';

interface EditUserProps {
  crud: string;
  defaultValues: Users | null;
  orgId: string;
  goBack: () => void;
}

const EditUsers = ({
  crud,
  defaultValues,
  goBack,
  orgId,
}: EditUserProps): JSX.Element => {
  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    onSubmit,
    control,
    register,
    formState,
    formValues,
    handleSubmit,
    handleUnsavedChange,
  } = useHandleEditUser(defaultValues, crud, goBack, orgId);

  const { t } = useTranslate();
  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card className="flex flex-col p-5 gap-6">
          <CardHeader className="text-gray-700 text-xl">
            {t(`user.${crud}User`)}
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {usersFields.map((field) =>
                field.name === 'phone' ? (
                  <Controller
                    key={field.name}
                    name={field.name as keyof UserFormData}
                    control={control}
                    render={({ field: fields }) => (
                      <PhoneInputItem
                        value={fields.value}
                        onChange={fields.onChange}
                        error={formState.errors[field.name]?.message}
                        required={field.required}
                        label={field.label}
                        defaultValue="ma"
                      />
                    )}
                  />
                ) : field.isSelect ? (
                  <Controller
                    key={field.name}
                    name={field.name as keyof UserFormData}
                    control={control}
                    render={({ field: fields }) => (
                      <MainSelect
                        label={field.label}
                        placeholder={field.placeholder}
                        options={field.options!}
                        value={fields.value}
                        onChange={fields.onChange}
                        error={formState.errors[field.name]?.message}
                        required={field.required}
                      />
                    )}
                  />
                ) : (
                  <FormInputItem
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    register={register(field.name as keyof UserFormData)}
                    value={
                      (defaultValues &&
                        crud == 'edit' &&
                        defaultValues[field.name]) ||
                      ''
                    }
                    error={formState.errors[field.name]?.message}
                    isLargeInput={true}
                    required={field.required}
                  />
                )
              )}
            </div>
          </CardContent>
          <div className="flex self-end gap-8 w-1/2">
            <Button
              type="button"
              className="w-full h-12 bg-transparent border border-blue-500 text-blue-500"
              onClick={() =>
                handleUnsavedChange(formValues)
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
            KeepEditFn={setOpenUnsavedChange.bind(null, false)}
            ConfermFn={goBack}
          />
        </Card>
      </form>
    </div>
  );
};

export default EditUsers;
