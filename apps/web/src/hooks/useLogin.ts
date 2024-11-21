import { api } from '@/api';
import { errorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['login'],

    mutationFn: api.api().auth.login,

    onSuccess: (res) => {
      const { data } = res;
      // Open the custom URL when the request is successful
      console.log('data:: ', data);
      const customUrl = `sygar://anaas?token=${data.token}`;
      window.location.href = customUrl; // Open the custom scheme URL
    },

    onError: (error) => errorToast(error.message),
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
