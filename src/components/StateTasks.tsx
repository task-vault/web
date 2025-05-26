import { useEffect, useMemo, useRef, useState } from 'react';
import { Task, TaskState } from '../types/tasks';
import NoTasksMessage from './NoTasksMessage';
import ParentTask from './ParentTask';

const sortByDeadline = (a: Task, b: Task) => {
  if (a.deadline && b.deadline) {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  }
  if (a.deadline) return -1;
  if (b.deadline) return 1;
  return a.id - b.id;
};

type StateTasksProps = {
  tasks: Task[];
  state: TaskState;
  doesHaveAddButton?: boolean;
};
const StateTasks = ({ tasks, state, doesHaveAddButton }: StateTasksProps) => {
  const [creating, setCreating] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const sortedTasks = useMemo(() => {
    return tasks.sort(sortByDeadline);
  }, [tasks]);

  useEffect(() => {
    if (creating && cancelRef.current) {
      cancelRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [creating]);

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
      {creating && (
        <ParentTask
          task={{
            id: -1,
            title: '',
            description: '',
            deadline: null,
            completed: false,
            subtasks: [],
          }}
          isCreating={true}
          setCreating={setCreating}
        />
      )}
      {doesHaveAddButton && (
        <button
          className='mt-4 flex w-fit self-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => {
            setCreating((prev) => !prev);
          }}
          ref={cancelRef}
        >
          {creating ? 'Cancel' : 'Add Task'}
        </button>
      )}
    </div>
  );
};

export default StateTasks;
