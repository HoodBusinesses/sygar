import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { Button } from './ui/button';
import CostumInputItem from './ui/custom-input-item';
import { forgetPassSchema } from '@/lib/schema/schema';

type Props = {
  isPending: boolean;
  isError: boolean;
  emailSent: boolean;
  mutate: any;
};
export default function ForgetPassForm({
  isPending,
  emailSent,
  mutate
}: Props) {

  // Initialize the form using react-hook-form with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(forgetPassSchema)
  });

  // Simulate form submission and different states (loading, success, redirect)
  const onSubmit: SubmitHandler<FieldValues> = data => {
    mutate({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CostumInputItem
        id='email'
        type='email'
        label={'Email'}
        placeholder={'Enter your email'}
        register={register('email')}
        isPending={isPending || emailSent}
        error={errors.email?.message?.toString()}
      />

      <Button
        type='submit'
        className={cn(
          emailSent
            ? 'w-full bg-green-600 text-white'
            : 'w-full bg-blue-600 hover:bg-blue-900 flex justify-center items-center'
        )}
        disabled={isPending || emailSent}
      >
        {emailSent ? (
          'Mail sent successfully'
        ) : isPending ? (
          <FiLoader className='animate-spin text-white w-6 h-6' />
        ) : (
          // <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
          'Get the reset link'
        )}
      </Button>
    </form>
  );
}