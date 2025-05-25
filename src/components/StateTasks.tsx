import { Task, TaskState } from '../types/tasks';
import NoTasksMessage from './NoTasksMessage';
import ParentTask from './ParentTask';

type StateTasksProps = {
  tasks: Task[];
  state: TaskState;
};
const StateTasks = ({ tasks, state }: StateTasksProps) => {
  if (!tasks.length) {
    return <NoTasksMessage state={state} />;
  }
  return (
    <div className='flex w-full flex-col gap-4 md:gap-4'>
      {tasks.map((task) => (
        <ParentTask
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

export default StateTasks;
