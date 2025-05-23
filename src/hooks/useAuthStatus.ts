import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { User } from '../types/user';
import { useCallback } from 'react';

const checkAccessToken = async (): Promise<User> => {
  try {
    const res = await api.get('/users/session');
    if (res.status === 200) return res.data as User;
  } catch {
    throw new Error('Access token invalid');
  }

  throw new Error('Session check failed');
};

const tryRefreshToken = async (): Promise<User> => {
  try {
    const res = await api.post('/users/refresh');
    if (res.status === 200) return res.data as User;
  } catch {
    throw new Error('Refresh token invalid');
  }

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
          error.message === 'Access token invalid'
        ) {
          return await tryRefreshToken();
        }
        throw error;
      }
    },
    refetchInterval: 1000 * 60 * 30, // refresh every 30 mins
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
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
