import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/'
          element={<Dashboard />}
        />
      </Route>
    </Routes>
  );
};

export default App;
