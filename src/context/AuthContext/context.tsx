import { createContext } from 'react';
import { User } from '../../types/user';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (
    email: string,
    password: string,
    shouldRemember: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {
    throw new Error('login function not implemented');
  },
  logout: async () => {
    throw new Error('logout function not implemented');
  },
  register: async () => {
    throw new Error('register function not implemented');
  },
});

export default AuthContext;
