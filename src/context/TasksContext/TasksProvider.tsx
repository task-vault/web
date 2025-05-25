import { useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { Task, TaskState } from '../../types/tasks';
import TasksContext from './context';
import api from '../../api';

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const get = useCallback(
    (state?: TaskState) => {
      if (!state) {
        return tasks;
      }
      switch (state) {
        case 'overdue':
          return overdueTasks;
        case 'pending':
          return pendingTasks;
        case 'completed':
          return completedTasks;
        default:
          return tasks;
      }
    },
    [tasks, overdueTasks, pendingTasks, completedTasks],
  );

  const getProgress = useCallback(async (id: number): Promise<number> => {
    try {
      const res = await api
        .get(`/tasks/${id}/progress`)
        .then((response) => response.data)
        .catch((error) => {
          if (error.response) {
            throw new Error(error.response.data.message.join(';'));
          } else {
            throw new Error('Network error');
          }
        });
      return res.progress as number;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return 0;
  }, []);

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

  const complete = useCallback(
    async (id: number) => {
      try {
        await api
          .post(`/tasks/${id}/complete`)
          .then(() => getTasks())
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
    },
    [getTasks],
  );

  const uncomplete = useCallback(
    async (id: number) => {
      try {
        await api
          .post(`/tasks/${id}/uncomplete`)
          .then(() => getTasks())
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
    },
    [getTasks],
  );

  const deleteTask = useCallback(
    async (id: number) => {
      try {
        await api
          .delete(`/tasks/${id}`)
          .then(() => getTasks())
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
    },
    [getTasks],
  );

  useEffect(() => {
    getTasks();
    getTasksByState('completed');
    getTasksByState('overdue');
    getTasksByState('pending');
  }, [getTasks, getTasksByState, tasks]);

  return (
    <TasksContext.Provider
      value={{ get, getProgress, complete, uncomplete, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
