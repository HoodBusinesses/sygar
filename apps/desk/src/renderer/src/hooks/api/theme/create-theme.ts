import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../useToast';
import { AxiosResponse } from 'axios';

export interface CreateThemeParams {
  cost: number;
  name: string;
  description: string;
  organizationId: string;
  startDate: number;
  endDate: number;
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
      api.post('/theme/create', params, {
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
          description: 'Theme created successfully',
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast({ title: 'Error', description: 'Error creating theme' });
    },
  });
}
