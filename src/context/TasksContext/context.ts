import { createContext } from 'react';
import { Task, TaskState } from '../../types/tasks';

type TasksContextType = {
  get: (state?: TaskState) => Task[];
  getProgress: (id: number) => Promise<number>;
  complete: (id: number) => Promise<void>;
  uncomplete: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const TasksContext = createContext<TasksContextType>({
  get: () => [],
  getProgress: async () => 0,
  complete: async () => {},
  uncomplete: async () => {},
  deleteTask: async () => {},
});

export default TasksContext;
