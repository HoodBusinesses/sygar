import { Users } from './users-columns'
import useHandleEditUser from '@renderer/hooks/editForms/useHandleEditUser'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { UserFormData } from '@renderer/utils/schemas/formSchema'
import { Button } from '@renderer/components/ui/button'
import { Card, CardHeader, CardContent } from '@renderer/components/ui/card'
import FormInputItem from '@renderer/components/ui/form-input-item'
import { usersFields } from '@renderer/data/formation-fields-input'
import UnsavedChangeEdit from '../unsaved-change-edit'

interface EditUserProps {
    crud: string
    defaultValues: Users | null
    goBack: () => void
}

const EditUsers = ({crud, defaultValues, goBack} : EditUserProps): JSX.Element => {
    const {
        openUnsavedChange,
        setOpenUnsavedChange,
        methods,
        handleSubmit,
        handleUnsavedChange,
      } = useHandleEditUser(defaultValues, crud)
      const { t } = useTranslate();
  return (
    <div className='p-4 w-full py-6 space-y-6'>
        <form className='space-y-6' onSubmit={methods.handleSubmit(handleSubmit)}>
            <Card className="flex flex-col p-5 gap-6">
                <CardHeader className="text-gray-700 text-xl">
                    {t(`user.${crud}User`)}
                </CardHeader>
                <CardContent className="">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {usersFields.map((field) => (
                            <FormInputItem
                                key={field.name}
                                label={field.label}
                                placeholder={field.placeholder}
                                register={methods.register(field.name as keyof UserFormData)}
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
                    KeepEditFn={setOpenUnsavedChange.bind(null, false)}
                    ConfermFn={goBack}
                />
            </Card>
        </form>
        
    </div>
  )
}

export default EditUsers