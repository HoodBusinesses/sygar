import { api } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './useToast';

export const useLogin = () => {
  const { toast } = useToast()
  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['login'],

    mutationFn: api.api().auth.login,

    onSuccess: (res) => {
      const { data } = res;
      // Open the custom URL when the request is successful
      console.log('data:: ', data);
      const customUrl = `sygar://anaas?token=${data}`;
      window.location.href = customUrl; // Open the custom scheme URL
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: 'Error logging in',
        description: error.cause,
        status: 'error',
        position: 'top',
      });
      console.error('error:: ', error)},
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
