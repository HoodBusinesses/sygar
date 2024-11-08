import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { setIsAuth } from '@renderer/store/slices/auth.slice';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AuthState {
  isLoading: boolean;
  error: Error | null;
  isAuth: boolean;
}

const fetchUser = async (token: string | null) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (!token) rej('ba3osha');
      res('ok');
    }, 1000);
  });
};

export const useAuth = (): AuthState => {
  const dispatch = useAppDispatch();

  const {
    auth: { isAuth, token },
  } = useAppSelector((state) => state.auth); // Select authentication state

  const router = useRouter();

  const onSuccess = useCallback(() => {
    dispatch(setIsAuth(true));
    if (router.latestLocation.pathname === '/signin') {
      router.navigate({ to: '/' });
    }
  }, [dispatch, router.latestLocation.pathname]);

  const onError = useCallback(() => {
    router.navigate({ to: '/signin' });
  }, [router]);

  const fetchUserCallback = useCallback(
    () => fetchUser(token),
    [fetchUser, token]
  );

  const { error, isLoading, status, refetch } = useQuery({
    queryKey: ['fetch-user-data', token],
    enabled: !isAuth,
    queryFn: fetchUserCallback,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // TODO : refactor this @smia
  useEffect(() => {
    if (status === 'error') {
      onError();
    }
    if (status === 'success') {
      onSuccess();
    }
  }, [status]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  return useMemo(
    () => ({
      isLoading,
      error: status === 'error' ? (error as Error) : null,
      isAuth: status === 'success' || isAuth,
    }),
    [isLoading, error, status, isAuth]
  );
};
