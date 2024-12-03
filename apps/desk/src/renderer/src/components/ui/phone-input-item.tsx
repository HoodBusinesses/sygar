import { useTranslate } from '@renderer/hooks/useTranslate';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  error?: string;
  required?: boolean;
};
export default function PhoneInputItem({
  label,
  error,
  required,
  value,
  onChange,
  defaultValue,
}: Props) {
  const { t } = useTranslate();

  return (
    <div className="flex flex-col mb-4 gap-1">
      <p className={'text-gray-950 text-sm mb-2'}>
        {t(label)} {required && <span className="text-red-500">*</span>}
      </p>
      <PhoneInput
        defaultCountry={defaultValue}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-100 text-gray-950 border border-input rounded-md  flex rtl:flex-row-reverse"
        inputStyle={{
          width: '100%',
          direction: 'ltr',
          height: '100%',
          padding: '20px 28px 20px 8px',
          border: 'none',
        }}
      />

      {error && <span className="text-sm text-red-500">{t(error)}</span>}
    </div>
  );
}
