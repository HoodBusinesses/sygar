import { AnyAction } from '@reduxjs/toolkit';
import { useToast } from '@renderer/hooks/useToast';
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

// Define a reusable function for handling Unauthorized errors
function handleAxiosError(
  error: unknown,
  dispatch: Dispatch<AnyAction>,
  toast: (args: {
    title: string;
    description: string;
    variant: 'destructive' | 'default' | 'success' | null | undefined;
  }) => void
) {
  const axiosError = error as AxiosError;
  const data = axiosError.response?.data as any;

  // Handle Unauthorized error
  if (data && data.statusCode === 401 && data.error === 'Unauthorized') {
    dispatch(resetAuth());
    localStorage.clear();
    toast({
      title: 'Unauthorized',
      description: 'Your session has expired. Please log in again.',
      variant: 'destructive',
    });
  }

  // Handle Permissions
  if (data && data.statusCode === 403 && data.message === 'Forbidden') {
    toast({
      title: 'Forbidden',
      variant: 'destructive',
      description:
        'You do not have the required permissions to perform this action.',
    });
  }
}

export const ReactQueryProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const queryClient = new QueryClient({
    // Configure default options for queries
    defaultOptions: {
      queries: {
        staleTime: Infinity, // Prevents automatic refetching
        retry: false, // Prevent retries on failure
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        refetchOnReconnect: false, // Prevent refetch on network reconnect
        refetchOnMount: false, // Prevent automatic refetch when the component mounts
      },
    },
    // Configure default options for mutations cache
    mutationCache: new MutationCache({
      onError: (error) => handleAxiosError(error, dispatch, toast),
    }),
    // Configure default options for queries cache
    queryCache: new QueryCache({
      onError: (error) => handleAxiosError(error, dispatch, toast),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
