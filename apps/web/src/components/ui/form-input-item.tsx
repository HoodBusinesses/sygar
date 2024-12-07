
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './input';
import { cn } from '@/lib/utils';
import CustomSelect from '../custom-select';


interface FormInputProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  value: string;
  defaultValue?: string;
  type?: string;
  error?: string;
  isLargeInput?: boolean;
  required?: boolean;
  isLogoInput?: boolean;
  isSelect?: boolean;
}

export default function FormInputItem({
  label,
  error,
  required,
  placeholder,
  register,
  type,
  value,
  isLargeInput,
  isLogoInput,
  isSelect,
}: FormInputProps) {
  
  return (
    <div className="flex flex-col mb-4 gap-1">
      <p
        className={cn(
          isLargeInput ? 'text-gray-600' : 'text-gray-950',
          'text-sm mb-2'
        )}
      >
        {(label)} {required && <span className="text-red-500">*</span>}
      </p>
      {isLogoInput ? (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 w-3/4">
          <input type="file" {...register} className="hidden" id="logo" />
          <label
            htmlFor="logo"
            className="text-sm text-gray-500 cursor-pointer"
          >
            {('Upload Logo')}
          </label>
        </div>
      ) :
        isSelect ? (
          <CustomSelect
            register={register}
            value={value}
            placeholder={placeholder}
            defaultValue={value}
          />
        )
          : (
            <Input
              {...register}
              defaultValue={value}
              placeholder={(placeholder)}
              type={type}
              className={cn(
                'bg-gray-100 text-gray-950 p-2 rounded-md'
              )}
            />
          )}
      {error && <span className="text-sm text-red-500">{(error)}</span>}
    </div>
  );
}
