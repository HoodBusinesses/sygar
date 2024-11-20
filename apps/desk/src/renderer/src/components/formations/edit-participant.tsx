import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ParticipantFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { participantFields } from '@renderer/data/formation-fields-input';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Button } from '../ui/button';
import UnsavedChangeEdit from '../unsaved-change-edit';
import useHandelEditParticipant from '@renderer/hooks/editForms/useHandleEditParticipant';

interface EditParticipantProps {
  crud: string;
  defaultValues: any;
  goBack: () => void;

}

const EditParticipant = ({ crud, defaultValues, goBack }: EditParticipantProps): JSX.Element => {
  const { t } = useTranslate();

  const {
    openUnsavedChange,
    setOpenUnsavedChange,
    methods,
    handleSubmit,
    handleUnsavedChange,
  } = useHandelEditParticipant(defaultValues, crud)

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <form className='space-y-6'
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <Card className="flex flex-col p-5 gap-6">
          <CardHeader className="text-gray-700 text-xl">
            {t(`participant.${crud}Participant`)}
          </CardHeader>

          <CardContent className="">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {participantFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={methods.register(field.name as keyof ParticipantFormData)}
                  value={(defaultValues && defaultValues[field.name]) || ''}
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
            ConfermFn={() => {
              console.log("first redir")
              goBack();
            }}
            KeepEditFn={setOpenUnsavedChange.bind(null, false)}
          />
        </Card>
      </form>
    </div>
  );
};

export default EditParticipant;
