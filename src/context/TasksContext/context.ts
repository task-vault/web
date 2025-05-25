import { createContext } from 'react';
import { Task, TaskState } from '../../types/tasks';

type TasksContextType = {
  get: (state?: TaskState) => Task[];
  getProgress: (id: number) => Promise<number>;
  complete: (id: number) => Promise<void>;
  uncomplete: (id: number) => Promise<void>;
  editTask: (
    id: number,
    data: { title: string; description?: string; deadline?: string },
  ) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeSubtask: (id: number, parentId: number) => Promise<void>;
  uncompleteSubtask: (id: number, parentId: number) => Promise<void>;
  editSubtask: (id: number, parentId: number, title: string) => Promise<void>;
  deleteSubtask: (id: number, parentId: number) => Promise<void>;
};

const TasksContext = createContext<TasksContextType>({
  get: () => [],
  getProgress: async () => 0,
  complete: async () => {},
  uncomplete: async () => {},
  editTask: async () => {},
  deleteTask: async () => {},
  completeSubtask: async () => {},
  uncompleteSubtask: async () => {},
  editSubtask: async () => {},
  deleteSubtask: async () => {},
});

export default TasksContext;
