import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute shouldRestrict />}>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path='/'
          element={<Dashboard />}
        />
      </Route>
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  );
};

export default App;
