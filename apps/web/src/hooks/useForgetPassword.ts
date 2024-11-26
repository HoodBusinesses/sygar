import { api } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './useToast';

export const useForgotPassword = () => {
  // Initialize router for page navigation
  const router = useRouter();
  // state for simulating redirecting

  const { toast } = useToast()
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['forgotPassword'],

    mutationFn: api.api().auth.forgotPassword,

    onSuccess: () => {
      router.push('/login'); // Redirect to the login page
    },

    onError: (error) => {
      toast({
        title: 'Error sending forgot password link',
        description: error.message,
        variant: "destructive" 
      });
      console.error('Error sending forgot password link:', error);
    },
  });

  return {
    data,
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
