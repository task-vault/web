import { useMemo, useState } from 'react';
import { Subtask } from '../types/tasks';
import SubtaskRow from './SubtaskRow';

const sortById = (a: Subtask, b: Subtask) => {
  return a.id - b.id;
};

type SubtasksProps = {
  subtasks: Subtask[];
  parent: number;
  refreshProgress: () => Promise<void>;
};
const Subtasks = ({ subtasks, parent, refreshProgress }: SubtasksProps) => {
  const [creating, setCreating] = useState(false);
  const sortedSubtasks = useMemo(() => {
    return subtasks.sort(sortById);
  }, [subtasks]);

  return (
    <div className='ml-5 flex flex-col gap-2 md:ml-16'>
      {sortedSubtasks.map((subtask) => (
        <SubtaskRow
          key={subtask.id}
          subtask={subtask}
          parent={parent}
          refreshProgress={refreshProgress}
        />
      ))}
      {creating ? (
        <SubtaskRow
          subtask={{ id: -1, title: '', completed: false }}
          parent={parent}
          refreshProgress={refreshProgress}
          setCreating={setCreating}
        />
      ) : (
        <button
          onClick={() => setCreating(true)}
          className='inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none'
        >
          Add Subtask
        </button>
      )}
    </div>
  );
};

export default Subtasks;
