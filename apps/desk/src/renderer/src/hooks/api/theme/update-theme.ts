import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useToast } from '@renderer/hooks/useToast';
import { CreateThemeParams } from './create-theme';

export interface UpdateThemeParams {
  uid: string;
  data: Partial<CreateThemeParams>;
}

export default function useUpdateTheme(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['UpdateOrg'],

    mutationFn: (params: UpdateThemeParams) =>
      api.put(`themes/${params.uid}`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

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

    ...options,

    onError: () => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Error creating Theme',
      });
    },
  });
}
