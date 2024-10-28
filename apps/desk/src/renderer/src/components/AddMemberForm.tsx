import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { memberSchema, type MemberFormData } from '../utils/schemas/organization'
import { useTranslation } from 'react-i18next'

interface AddMemberFormProps {
  onSubmit: (data: MemberFormData) => void
  initialData?: MemberFormData
}

export const AddMemberForm = ({ onSubmit, initialData }: AddMemberFormProps) => {
  const { t } = useTranslation() // Hook for translations

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData
  })

  const handleFormSubmit = (data: MemberFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">{t('membersTable.fullName')}</p>
          <Input
            {...register('fullName')}
            placeholder={t('placeholders.fullName')} // Translated placeholder
            className="bg-gray-100 text-gray-950"
          />
          {errors.fullName && (
            <span className="text-sm text-red-500">{errors.fullName.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">{t('membersTable.email')}</p>
          <Input
            {...register('email')}
            placeholder={t('placeholders.email')} // Translated placeholder
            className="bg-gray-100 text-gray-950"
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">{t('membersTable.role')}</p>
          <Select onValueChange={(value) => register('role').onChange({ target: { value } })}>
            <SelectTrigger className="text-gray-700">
              <SelectValue placeholder={t('placeholders.selectRole')} />{' '}
              {/* Translated placeholder */}
            </SelectTrigger>
            <SelectContent className="text-gray-700 bg-white">
              <SelectItem value="manager">{t('roles.manager')}</SelectItem>
              <SelectItem value="employee">{t('roles.employee')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <span className="text-sm text-red-500">{errors.role.message}</span>}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">{t('membersTable.actionType')}</p>
          <Select onValueChange={(value) => register('actionType').onChange({ target: { value } })}>
            <SelectTrigger className="text-gray-700">
              <SelectValue placeholder={t('placeholders.selectActionType')} />{' '}
              {/* Translated placeholder */}
            </SelectTrigger>
            <SelectContent className="text-gray-700 bg-white">
              <SelectItem value="edit">{t('actionTypes.edit')}</SelectItem>
              <SelectItem value="view">{t('actionTypes.view')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.actionType && (
            <span className="text-sm text-red-500">{errors.actionType.message}</span>
          )}
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            onClick={handleSubmit(handleFormSubmit)}
            className="btn-blue rounded-md"
          >
            {t('buttons.add')} {/* Translated button label */}
          </Button>
        </div>
      </div>
    </div>
  )
}
