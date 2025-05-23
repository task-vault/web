import { PropsWithChildren, useCallback } from 'react';
import api from '../../api';
import useAuthStatus from '../../hooks/useAuthStatus';
import AuthContext from './context';
import { clearAuthCookies } from '../../utils/cookies';

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
              throw new Error(error.response.data.message.join(';'));
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

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ): Promise<void> => {
      try {
        await api
          .post('/users/register', {
            firstName,
            lastName,
            email,
            password,
          })
          .catch((error) => {
            if (error.response) {
              throw new Error(error.response.data.message.join(';'));
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
    clearAuthCookies();
    try {
      await api.post('/users/logout').catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message.join(';'));
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
      value={{ isAuthenticated, isLoading, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
