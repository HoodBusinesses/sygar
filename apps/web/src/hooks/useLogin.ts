import { api } from '@/api';
import { errorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { data, isPending, isError, isSuccess, mutate } = useMutation({    
    mutationKey: ['login'],

    mutationFn: api.api().auth.login,

    onSuccess: () => {
      // Open the custom URL when the request is successful
      const token = data; // Assuming the response contains a token
      console.log('data:: ', data);
      const customUrl = `sygar://anaas?token=${token}`;
      window.location.href = customUrl; // Open the custom scheme URL
    },

	  onError: (error) => errorToast(error.message),
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate
  };
};
