import { createContext } from 'react';
import { Task, TaskState } from '../../types/tasks';

type TasksContextType = {
  get: (state?: TaskState) => Task[];
};

const TasksContext = createContext<TasksContextType>({
  get: () => [],
});

export default TasksContext;
