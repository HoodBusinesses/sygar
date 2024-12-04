import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useTranslate } from '@renderer/hooks/useTranslate';

type Props = {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

export default function MainSelect({
  value,
  label,
  placeholder,
  options,
  required,
  error,
  onChange,
}: Props) {
  const { t } = useTranslate();
  return (
    <div className="flex flex-col mb-4 gap-1">
      <p className={'text-gray-600 text-[12px] leading-[12px] tracking-[0.3px] mb-2 font-poppins font-normal'}>
        {t(label)} {required && <span className="text-red-500">*</span>}
      </p>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="bg-gray-100 text-gray-950 h-10 rounded-md">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-950 rounded-md">
          {(options || []).map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-red-500">{t(error)}</span>}
    </div>
  );
}
