import { Button } from '@renderer/components/ui/button';
import UnsavedChangeEdit from '@renderer/components/unsaved-change-edit';
import withAuth from '@renderer/hoc/with-auth';
import useHandelEditForm from '@renderer/hooks/editForms/useHandelEditFormation';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

function EditPage({
  goBack,
  Form,
  defaultValues,
  type,
  crud,
}: {
  goBack: () => void;
  Form: ReactNode;
  crud: string;
  type: string;
  defaultValues?: any;
}): JSX.Element {
  const navigate = useNavigate();

  const { t } = useTranslate();

  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  } = useHandelEditForm(defaultValues, crud);

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="flex flex-col p-5 gap-6">
            {Form}
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
                console.log('ConfermFn type:', type);
                navigate({ to: `/${type}-listing` });
              }}
              KeepEditFn={setOpenUnsavedChange.bind(null, false)}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default withAuth(EditPage);
