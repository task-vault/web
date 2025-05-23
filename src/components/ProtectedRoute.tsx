import { Navigate, Outlet } from 'react-router';
import useAuth from '../context/AuthContext/useAuth';
import TaskVaultLogo from './TaskVaultLogo';

type ProtectedRouteProps = {
  shouldRestrict?: boolean;
};

const ProtectedRoute = ({ shouldRestrict }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <TaskVaultLogo className='h-32 w-32 opacity-50' />
      </div>
    );
  }
  if (shouldRestrict && isAuthenticated) {
    return <Navigate to='/' />;
  }
  if (!shouldRestrict && !isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
