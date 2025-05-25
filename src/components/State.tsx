import { useState } from 'react';
import { Task, TaskState } from '../types/tasks';
import useTasks from '../context/TasksContext/useTasks';
import StateHeader from './StateHeader';

type StateProps = {
  state: TaskState;
};
const State = ({ state }: StateProps) => {
  const { get } = useTasks();
  const [tasks, setTasks] = useState<Task[]>(() => get(state));
  const [isOpen, setIsOpen] = useState<boolean>(state === 'pending');

  return (
    <div className='flex w-[50%] flex-col items-center justify-center gap-2'>
      <StateHeader
        state={state}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default State;
