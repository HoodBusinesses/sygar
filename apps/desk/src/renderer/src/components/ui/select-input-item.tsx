import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { useTranslate } from '@renderer/hooks/useTranslate'

interface SelectInputProps {
  label: string
  placeholder: string
  onValueChange: (value: string) => void
  error?: string
  items: { value: string; translationKey: string }[]
}

export default function SelectInputItem({
  label,
  error,
  onValueChange,
  placeholder,
  items
}: SelectInputProps) {
  const { t } = useTranslate()

  return (
    <div className="flex flex-col">
      <p className="text-gray-600 text-sm mb-2">{t(label)}</p>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="text-gray-700">
          <SelectValue placeholder={t(placeholder)} />
        </SelectTrigger>
        <SelectContent className="text-gray-700 bg-white">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {t(item.translationKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
