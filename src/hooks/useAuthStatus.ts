import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { User } from '../types/user';
import { useCallback } from 'react';

const checkAccessToken = async (): Promise<User> => {
  const res = await api.get('/users/session');

  if (res.status === 200) return res.data as User;
  if (res.status === 401) throw new Error('Access token expired');
  throw new Error('Session check failed');
};

const tryRefreshToken = async (): Promise<User> => {
  const res = await api.post('/users/refresh');

  if (res.status === 200) return res.data as User;
  if (res.status === 401) throw new Error('Refresh token expired');
  throw new Error('Refresh token failed');
};

const useAuthStatus = () => {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        return await checkAccessToken();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Access token expired'
        ) {
          return await tryRefreshToken();
        }
        throw error;
      }
    },
    refetchInterval: 1000 * 60 * 30, // refresh every 30 mins
    refetchIntervalInBackground: true,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });

  const recheckStatus = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    isAuthenticated: query.isSuccess,
    isLoading: query.isLoading,
    user: query.data as User | null,
    recheckStatus,
  };
};

export default useAuthStatus;
