import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { Role, setIsAuth, setUserData, UserType } from '@renderer/store/slices/auth.slice';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useGetMe, User } from './api/user/me';

interface AuthState {
  isLoading: boolean;
  error: Error | null;
  isAuth: boolean;
}

export const useAuth = (): AuthState => {
  const dispatch = useAppDispatch();

  const {
    auth: { isAuth },
  } = useAppSelector((state) => state.auth); // Select authentication state

  const router = useRouter();
  
  const { error, isLoading, status, data } = useGetMe();

  const onSuccess = useCallback((usrData: User) => {
    dispatch(setIsAuth(true));
    dispatch(setUserData({
      userId: usrData.id ?? '',
      organizationId: usrData.organizationId ?? '',
      firstName: usrData.firstName ?? '',
      lastName: usrData.lastName ?? '',
      role: (usrData.role ?? 'User') as Role,
      userType: (usrData.type ?? 'ORGANIZATION_USER') as UserType,
      isAccountActivated: usrData.isActive,
    }));

    if (router.latestLocation.pathname === '/signin') {
      router.navigate({ to: '/' });
    }
  }, [dispatch, router.latestLocation.pathname]);

  const onError = useCallback(() => {
    dispatch(setIsAuth(false));
    router.navigate({ to: '/signin' });
  }, [router]);

  // TODO : refactor this @smia
  useEffect(() => {
    if (status === 'error') {
      onError();
    }
    if (status === 'success') {
      onSuccess(data);
    }
  }, [status]);

  // useEffect(() => {
  //   if (token) {
  //     refetch();
  //   }
  // }, [token]);

  return useMemo(
    () => ({
      isLoading,
      error: status === 'error' ? (error as Error) : null,
      isAuth: status === 'success' || isAuth,
    }),
    [isLoading, error, status, isAuth]
  );
};
