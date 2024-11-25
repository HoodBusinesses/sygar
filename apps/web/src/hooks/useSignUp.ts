import { api } from '@/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useSignup = (
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) => {
  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['Signup'],

    mutationFn: api.api().organization.create,

    ...options,

    onError: (error) => {},
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
