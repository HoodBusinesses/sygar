import { InternalError } from '@renderer/containers/internal-error';
import { Loading } from '@renderer/containers/laoding';
import { useAuth } from '@renderer/hooks/useAuth';
import { ComponentType, FC } from 'react';

const withAuth = (WrappedComponent: ComponentType<any>): FC<any> => {
  return (props) => {
    const auth = useAuth();

    if (auth.isAuth) {
      return <WrappedComponent {...props} />;
    }

    if (auth.isLoading) {
      return <Loading />;
    }

    return <InternalError />;
  };
};

export default withAuth;
