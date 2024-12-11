import { AnyAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@renderer/store/hooks';
import { resetAuth } from '@renderer/store/slices/auth.slice';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { useTranslate } from '@renderer/hooks/useTranslate';

// Define a reusable function for handling Unauthorized errors
function handleAxiosError(
  error: unknown,
  dispatch: Dispatch<AnyAction>
) {
  const axiosError = error as AxiosError;
  const data = axiosError.response?.data as any;
  const { t } = useTranslate();
  // Handle Unauthorized error
  if (data && data.statusCode === 401 && data.error === 'Unauthorized') {
    dispatch(resetAuth());
    localStorage.clear();
  }

  // Handle Permissions
  if (data && data.statusCode === 403 && data.message === 'Forbidden') {
    toast.error(t('notifications.permission.error'), {
      position: 'top-center',
      className : '!bg-red-200 custom-toast'
    });
  }
}

export const ReactQueryProvider = ({ children }) => {
  const dispatch = useAppDispatch();

  const queryClient = new QueryClient({
    // Configure default options for queries
    defaultOptions: {
      queries: {
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false, // Prevent refetch on network reconnect
        refetchOnMount: false, // Prevent automatic refetch when the component mounts
      },
    },
    // Configure default options for mutations cache
    mutationCache: new MutationCache({
      onError: (error) => handleAxiosError(error, dispatch),
    }),
    // Configure default options for queries cache
    queryCache: new QueryCache({
      onError: (error) => handleAxiosError(error, dispatch),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
