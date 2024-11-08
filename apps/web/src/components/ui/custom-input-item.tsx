import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './input';
import { Label } from './label';

interface FormInputProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  isPending: boolean;
  error?: string;
  id: string;
  type: string;
}

export default function CostumInputItem({
  label,
  error,
  placeholder,
  register,
  isPending,
  id,
  type,
}: FormInputProps) {
  return (
    <>
      <Label className="text-gray-600" htmlFor={id}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        {...register}
        placeholder={placeholder}
        className={`mt-1 block w-full ${error ? 'border-red-500' : ''}`}
        disabled={isPending}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </>
  );
}
