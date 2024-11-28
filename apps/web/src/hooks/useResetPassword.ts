import { api } from '@/api';
import { ResetPasswordParams } from '@repo/exapi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './useToast';

export const useResetPassword = () => {
  console.log('0000');

  const router = useRouter();

  const { toast } = useToast()
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['resetPassword'],

    mutationFn: async (params: Omit<ResetPasswordParams, 'token'>) => {
      const url = new URLSearchParams(window.location.search);
      const token = url.get('token');
      console.log('====================================');
      console.log('data data', token);
      console.log('====================================');
      console.log('====================================');
      console.log('params: ', params);
      console.log('====================================');
      return api.api().auth.resetPassword({ ...params, token: token! });
    },

    onSuccess: () => {
      console.log('Password reset successful:', data);
      router.push('/login');
    },

    onError: (error) => {
      toast({
        title: 'Error resetting password',
        description: error.message,
        variant: "destructive" 
      })
      console.log('Error resetting password:', error);
    },
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
