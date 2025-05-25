import { createContext } from 'react';
import { Task } from '../../types/tasks';

type TasksContextType = {
  tasks: Task[];
  overdueTasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
};

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  overdueTasks: [],
  pendingTasks: [],
  completedTasks: [],
});

export default TasksContext;
