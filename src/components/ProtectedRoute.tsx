import { Navigate, Outlet } from 'react-router';

const isLoggedIn = false;

const ProtectedRoute = () => {
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};

export default ProtectedRoute;
