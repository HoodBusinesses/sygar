import { useTranslate } from '@renderer/hooks/useTranslate'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Input } from './input'

interface FormInputProps {
  label: string
  placeholder: string
  register: UseFormRegisterReturn
  value: string
  error?: string
  required?: boolean
  isLogoInput?: boolean
}

export default function FormInputItem({
  label,
  error,
  required,
  placeholder,
  register,
  value,
  isLogoInput
}: FormInputProps) {
  const { t } = useTranslate()

  return (
    <div className="flex flex-col mb-4 gap-1">
      <p className="text-sm text-gray-950 mb-2">
        {t(label)} {required && <span className="text-red-500">*</span>}
      </p>
      {isLogoInput ? (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 w-3/4">
          <input type="file" {...register} className="hidden" id="logo" />
          <label htmlFor="logo" className="text-sm text-gray-500 cursor-pointer">
            {t('registration.basicInfo.fields.logo.placeholder')}
          </label>
        </div>
      ) : (
        <Input
          {...register}
          defaultValue={t(value)}
          placeholder={t(placeholder)}
          className="bg-gray-100 text-gray-950 p-2 rounded-md"
        />
      )}
      {error && <span className="text-sm text-red-500">{t(error)}</span>}
    </div>
  )
}
