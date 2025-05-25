import { useContext } from 'react';
import TasksContext from './context';

const useAuth = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within an TasksProvider');
  }
  return context;
};

export default useAuth;
