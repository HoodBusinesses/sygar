import { themesMockData } from '@renderer/utils/static';
import { useQuery } from '@tanstack/react-query';


export type Theme = {
  id: number;
  name: string;
  year: string;
  price: number;
  identifier: string;
};

export const useThemes = () => {
  return useQuery<Theme[]>({
    queryKey: ['themes', 'iddd'],
    queryFn: async () => {
      // Simulate data fetching time
      await new Promise((resolve) => setTimeout(resolve, 500));
      return themesMockData as Theme[];
    },
  });
};
