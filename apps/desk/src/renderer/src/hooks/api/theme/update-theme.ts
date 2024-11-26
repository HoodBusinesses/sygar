import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ThemesData } from './get-alll-thems';
import { useToast } from '@renderer/hooks/useToast';

export interface UpdateThemeParams {
  uid: string;
  data: Partial<ThemesData>;
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
      api.put(`theme/update`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { uid: params.uid },
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
