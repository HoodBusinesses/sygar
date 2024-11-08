'use client';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useLogin';
import { signInSchema } from '@/lib/schema/schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams } from '@repo/exapi';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader, FiEye, FiEyeOff } from 'react-icons/fi'; // Add eye icons for password toggle
import CostumInputItem from './ui/custom-input-item';
import { useState } from 'react';

export default function SignInForm() {
  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const params: LoginParams = {
      email: data.login, // Assuming 'login' field is used for email
      password: data.password, // Assuming 'password' field is present in the form
    };
    mutate(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-950">
        Sign in to your account
      </h2>
      {/* Login Field */}
      <CostumInputItem
        id="login"
        type="text"
        label={'Login'}
        placeholder={'Email or phone number'}
        register={register('login')}
        isPending={isPending}
        error={errors.login?.message?.toString()}
      />
      {/* Password Field with Toggle */}
      <div className="relative mb-4">
        <CostumInputItem
          id="password"
          type={showPassword ? 'text' : 'password'}
          label={'Password'}
          placeholder={'Enter password'}
          register={register('password')}
          isPending={isPending}
          error={errors.password?.message?.toString()}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 transform translate-y-1 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {/* Forgot Password Link */}
      <div className="text-right">
        <a
          href="/forgetPassword"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot password?
        </a>
      </div>
      {/* Sign In Button with Loader */}
      <Button
        type="submit"
        className={cn(
          isPending ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700',
          'w-full text-white py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center'
        )}
        disabled={isPending}
      >
        {isPending ? (
          <FiLoader className="animate-spin w-5 h-5 mr-2" />
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  );
}
