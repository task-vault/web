import { useEffect, useState } from 'react';
import { Task, TaskState } from '../types/tasks';
import useTasks from '../context/TasksContext/useTasks';
import StateHeader from './StateHeader';
import StateTasks from './StateTasks';

type StateProps = {
  state: TaskState;
};
const State = ({ state }: StateProps) => {
  const { get } = useTasks();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(state === 'pending');

  useEffect(() => {
    setTasks(get(state));
  }, [get, state]);

  return (
    <div className='flex w-[95%] flex-col items-center justify-center gap-10 md:w-[75%] md:gap-12 lg:w-[50%]'>
      <StateHeader
        state={state}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <StateTasks
          tasks={tasks}
          state={state}
        />
      )}
    </div>
  );
};

export default State;
