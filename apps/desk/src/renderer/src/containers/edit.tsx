import { zodResolver } from '@hookform/resolvers/zod'
import EditFormation from '@renderer/components/formations/edit-formation'
import EditGroup from '@renderer/components/formations/edit-group'
import EditParticipant from '@renderer/components/formations/edit-participant'
import { Button } from '@renderer/components/ui/button'
import withAuth from '@renderer/hoc/with-auth'
import { useTranslate } from '@renderer/hooks/useTranslate'
import {
  FormationFormData,
  formationSchema,
  groupSchema,
  participantSchema
} from '@renderer/utils/schemas/formSchema'
import { useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'

function EditPage(): JSX.Element {
  const navigate = useNavigate()
  const url = new URLSearchParams(window.location.search)
  const type = url.get('type')
  const crud = url.get('crud')
  console.log('type ::::', type, crud)
  const schema =
    type === 'themes' ? formationSchema : type === 'group' ? groupSchema : participantSchema

  const methods = useForm<FormationFormData>({
    resolver: zodResolver(schema)
  })
  const { t } = useTranslate()
  const handleSubmit = (data: FormationFormData) => {
    console.log('data :::', data)
  }

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex flex-col p-5 gap-6">
            <p className="text-2xl uppercase font-semibold text-gray-800">{`${crud} ${type}`}</p>
            {type === 'themes' && <EditFormation formation={null} />}
            {type === 'group' && <EditGroup group={null} />}
            {type === 'participant' && <EditParticipant participant={null} />}
            <div className="flex self-end gap-8 w-1/2">
              <Button
                type="button"
                className="w-full h-12  bg-transparent border border-blue-500 text-blue-500"
                onClick={() => navigate({ to: `/${type}-listing` })}
              >
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" className="w-full h-12 bg-blue-500   text-white">
                {t('buttons.save')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default withAuth(EditPage)
