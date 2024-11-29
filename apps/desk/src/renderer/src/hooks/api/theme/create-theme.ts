import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../useToast';
import { AxiosResponse } from 'axios';

export interface CreateThemeParams {
  price: string;
  name: string;
  year: string;
  organizationId: string;
}

export default function useCreateTheme(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['createTheme'],

    mutationFn: (params: CreateThemeParams) =>
      api.post('/themes', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ...options,
    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['themesData'],
          exact: true,
        });
        toast({
          title: 'success',
          variant: 'success',
          description: 'Theme created successfully',
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Error creating theme',
      });
    },
  });
}
