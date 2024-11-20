import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface CreateThemeParams {
  name: string;
  cost: number;
  description: string;
  organizationId: string;
  startDate: number;
  endDate: number;
}

export default function useCreateTheme() {
  const token = useAppSelector((state) => state.auth.auth.token);

  return useMutation({
    mutationKey: ['CreateTheme'],

    mutationFn: (params: CreateThemeParams) =>
      api.post('/theme/create', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (res) => {
      console.log('success', res.data);
    },

    onError: () => {
      console.log('error');
    },
  });
}
