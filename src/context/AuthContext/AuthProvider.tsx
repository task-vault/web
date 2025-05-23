import { PropsWithChildren, useCallback } from 'react';
import api from '../../api';
import useAuthStatus from '../../hooks/useAuthStatus';
import AuthContext from './context';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading, user, recheckStatus } = useAuthStatus();

  const login = useCallback(
    async (
      email: string,
      password: string,
      shouldRemember: boolean,
    ): Promise<void> => {
      const res = await api.post('/users/login', {
        email,
        password,
        shouldRemember,
      });
      if (res.data && res.data.email) {
        recheckStatus();
      }
    },
    [recheckStatus],
  );

  const logout = useCallback(async (): Promise<void> => {
    const res = await api.post('/users/logout');
    if (res.status === 200) {
      recheckStatus();
    }
  }, [recheckStatus]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
