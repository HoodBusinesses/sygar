import EditFormation from '@renderer/components/formations/edit-formation';
import EditGroup from '@renderer/components/formations/edit-group';
import EditParticipant from '@renderer/components/formations/edit-participant';
import { Button } from '@renderer/components/ui/button';
import UnsavedChangeEdit from '@renderer/components/unsaved-change-edit';
import withAuth from '@renderer/hoc/with-auth';
import useHandelEditForm from '@renderer/hooks/useHandelEditForm';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import React, { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

function EditPage({
  goBack,
  Form,
}: {
  goBack: () => void;
  Form: ReactNode;
}): JSX.Element {
  const navigate = useNavigate();

  const { t } = useTranslate();

  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
    type,
    crud,
    defaultValues,
  } = useHandelEditForm();

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="flex flex-col p-5 gap-6">
            {Form}
            {/* {type === 'group' && <EditGroup crud={crud as string} defaultValues={defaultValues}/>} */}
            {/* {type === 'participant' && <EditParticipant crud={crud as string} defaultValues={defaultValues}/>} */}
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
              ConfermFn={() => navigate({ to: `/${type}-listing` })}
              KeepEditFn={setOpenUnsavedChange.bind(null, false)}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default withAuth(EditPage);
