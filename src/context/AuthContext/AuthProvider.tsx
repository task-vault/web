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
      try {
        await api
          .post('/users/login', {
            email,
            password,
            shouldRemember,
          })
          .catch((error) => {
            if (error.response) {
              throw new Error(error.response.data.message.join('\n'));
            } else {
              throw new Error('Network error');
            }
          });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
      recheckStatus();
    },
    [recheckStatus],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.post('/users/logout').catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message.join('\n'));
        } else {
          throw new Error('Network error');
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    recheckStatus();
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
