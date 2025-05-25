import { Task, TaskState } from '../types/tasks';
import NoTasksMessage from './NoTasksMessage';

type StateTasksProps = {
  tasks: Task[];
  state: TaskState;
};
const StateTasks = ({ tasks, state }: StateTasksProps) => {
  if (!tasks.length) {
    return <NoTasksMessage state={state} />;
  }
  return <div className='capitalize'>{state} tasks</div>;
};

export default StateTasks;
