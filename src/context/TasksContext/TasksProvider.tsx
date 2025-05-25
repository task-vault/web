import { useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { Task, TaskState } from '../../types/user';
import TasksContext from './context';
import api from '../../api';

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    try {
      await api
        .get('/tasks')
        .then((response) => setTasks(response.data))
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
  }, []);

  const getTasksByState = useCallback(async (state: TaskState) => {
    try {
      await api
        .get(`/tasks/state/${state}`)
        .then((response) => {
          switch (state) {
            case 'overdue':
              setOverdueTasks(response.data);
              break;
            case 'pending':
              setPendingTasks(response.data);
              break;
            case 'completed':
              setCompletedTasks(response.data);
              break;
          }
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
  }, []);

  useEffect(() => {
    getTasks();
    getTasksByState('completed');
    getTasksByState('overdue');
    getTasksByState('pending');
  }, [getTasks, getTasksByState]);

  return (
    <TasksContext.Provider
      value={{ tasks, overdueTasks, pendingTasks, completedTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};
