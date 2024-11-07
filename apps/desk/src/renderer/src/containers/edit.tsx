import { zodResolver } from '@hookform/resolvers/zod'
import EditFormation from '@renderer/components/formations/edit-formation'
import EditGroup from '@renderer/components/formations/edit-group'
import EditParticipant from '@renderer/components/formations/edit-participant'
import { Button } from '@renderer/components/ui/button'
import withAuth from '@renderer/hoc/with-auth'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { FormationFormData, formationSchema } from '@renderer/utils/schemas/formSchema'
import { useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'

function EditPage(): JSX.Element {
  const navigate = useNavigate()
  const url = new URLSearchParams(window.location.search)
  const type = url.get('type')
  const crud = url.get('crud')
  console.log('type ::::', type, crud)

  const methods = useForm<FormationFormData>({
    resolver: zodResolver(formationSchema)
  })
  const { t } = useTranslate()

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <p className="">{`${crud} ${type}`}</p>
        {type === 'group' && <EditGroup group={null} />}
        {type === 'formation' && <EditFormation formation={null} />}
        {type === 'participant' && <EditParticipant participant={null} />}
        <div className="flex justify-end">
          <Button
            type="button"
            className="w-full custom-button bg-gray-400 sm:w-auto"
            onClick={() => navigate({ to: '/themes-listing' })}
          >
            {t('buttons.cancel')}
          </Button>
          <Button type="submit" className="w-full custom-button bg-blue-400 sm:w-auto">
            {t('buttons.save')}
          </Button>
        </div>
      </div>
    </FormProvider>
  )
}

export default withAuth(EditPage)
