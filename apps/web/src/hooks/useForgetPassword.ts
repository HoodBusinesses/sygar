import { api } from '@/api';
import { errorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useForgotPassword = () => {
  // Initialize router for page navigation
  const router = useRouter();
  // state for simulating redirecting
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['forgotPassword'],

    mutationFn: api.api().auth.forgotPassword,

    onSuccess: () => {
      router.push('/login'); // Redirect to the login page
    },

    onError: (error) => errorToast(error.message),
  });

  return {
    data,
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
