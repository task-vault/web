import { useMemo } from 'react';
import { Task, TaskState } from '../types/tasks';
import NoTasksMessage from './NoTasksMessage';
import ParentTask from './ParentTask';

const sortByDeadline = (a: Task, b: Task) => {
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
};

type StateTasksProps = {
  tasks: Task[];
  state: TaskState;
};
const StateTasks = ({ tasks, state }: StateTasksProps) => {
  const sortedTasks = useMemo(() => {
    return tasks.sort(sortByDeadline);
  }, [tasks]);

  if (!tasks.length) {
    return <NoTasksMessage state={state} />;
  }

  return (
    <div className='flex w-full flex-col gap-4 md:gap-4'>
      {sortedTasks.map((task) => (
        <ParentTask
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

export default StateTasks;
