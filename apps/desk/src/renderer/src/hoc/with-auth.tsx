import { ComponentType, FC } from 'react';
import { useQuery } from 'react-query'

const fetchUser = async (token: string | null) => {
  if (!token) {
    throw new Error('invalid token');
  }
  return new Promise((res) => {
    setTimeout(() => res('ok'), 3000);
  })
}

const withAuth = (WrappedComponent: ComponentType<any>): FC<any> => {
  return (props) => {
    const token = localStorage.getItem('token');
    const { status } = useQuery(['fetch-user-data', token], () => fetchUser(token), {
      enabled: !!token,
      retry: 0,
    });

    if (!token || status === 'error') {
      // console.log('hello from error')
      return <WrappedComponent {...props} />;
    }

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'success') {
      return <WrappedComponent {...props} />;
    }

    return <p>Something went wrong badly</p>;
  };
};
export default withAuth
