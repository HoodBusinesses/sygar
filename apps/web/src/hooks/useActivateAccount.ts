import { api } from '@/api';
import { errorToast } from '@/lib/toasts';
import { ActivateAccountParams } from '@repo/exapi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useActivateAccount = () => {
  console.log('0000');

  const router = useRouter();

  console.log('====================================');
  console.log('====================================');
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['activateAccount'],

    mutationFn: async (params: Omit<ActivateAccountParams, 'token'>) => {
      const url = new URLSearchParams(window.location.search);
      const token = url.get('token');
      console.log('====================================');
      console.log('token data', token);
      console.log('====================================');
      console.log('====================================');
      console.log('params: ', params);
      console.log('====================================');
      return api.api().auth.activateAccount({ ...params, token: token! });
    },

    onSuccess: () => {
      console.log('Account activation successful:', data);
      router.push('/login');
    },

    onError: (error) => {
      errorToast(error.message);
      console.log('Error activating account:', error);
    },
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
