import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useLogin';
import { signInSchema } from '@/lib/schema/schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams } from '@repo/exapi';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi'; // Import FiLoader for spinner
import CostumInputItem from './ui/custom-input-item';

export default function SignInForm() {

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  });

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const params: LoginParams = {
      email: data.login, // Assuming 'login' field is used for email
      password: data.password // Assuming 'password' field is present in the form
    };
    mutate(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <h2 className='text-xl font-bold text-center text-gray-950'>
        Sign in to your account
      </h2>

      {/* Login Field */}
      <CostumInputItem
        id='login'
        type='text'
        label={'Login'}
        placeholder={'Enter your email or phone number'}
        register={register('login')}
        isPending={isPending}
        error={errors.login?.message?.toString()}
      />

      {/* Password Field */}
      <CostumInputItem
        id='password'
        type='password'
        label={'Password'}
        placeholder={'Enter your password'}
        register={register('password')}
        isPending={isPending}
        error={errors.password?.message?.toString()}
      />

      {/* Forgot Password */}
      <div className='text-right'>
        <a
          href='/resetPassword'
          className='text-sm text-blue-500 hover:underline'
        >
          Forgot password?
        </a>
      </div>

      {/* Sign In Button with Loader */}
      <Button
        type='submit'
        className={cn(
          isPending ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700',
          'w-full text-white py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center'
        )}
        disabled={isPending}
      >
        {isPending ? (
          <FiLoader className='animate-spin w-5 h-5 mr-2' />
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
}
