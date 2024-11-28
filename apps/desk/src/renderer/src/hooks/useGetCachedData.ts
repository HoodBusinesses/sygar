import { QueryKey, useQueryClient } from '@tanstack/react-query';

interface QueryResponse<T> {
  data: T;
  [key: string]: any;
}

export default function useGetCachedData<T>(key: QueryKey): T | undefined {
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<QueryResponse<T>>(key);

  console.log('cachedData', cachedData);

  return cachedData?.data;
}
