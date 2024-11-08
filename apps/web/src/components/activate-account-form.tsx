import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import CostumInputItem from '@/components/ui/custom-input-item';
import { z } from 'zod';

const activateAccountSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must not exceed 100 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Props = {
  isPending: boolean;
  isError: boolean;
  mutate: (params: { password: string }) => void;
};

export default function ActivateAccountForm({
  isPending,
  mutate,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(activateAccountSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({ password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CostumInputItem
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        register={register('password')}
        isPending={isPending}
        error={errors.password?.message?.toString()}
      />
      <CostumInputItem
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        register={register('confirmPassword')}
        isPending={isPending}
        error={errors.confirmPassword?.message?.toString()}
      />

      <Button
        type="submit"
        className={cn(
          'w-full bg-blue-600 hover:bg-blue-900 flex justify-center items-center'
        )}
        disabled={isPending}
      >
        {isPending ? (
          <FiLoader className="animate-spin text-white w-6 h-6" />
        ) : (
          'Activate Account'
        )}
      </Button>
    </form>
  );
}
