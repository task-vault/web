import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { TasksProvider } from './context/TasksContext/TasksProvider';

const App = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-br from-green-100 to-blue-200'>
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
            element={
              <TasksProvider>
                <Dashboard />
              </TasksProvider>
            }
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

export default App;
