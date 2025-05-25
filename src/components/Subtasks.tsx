import { useMemo } from 'react';
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
    </div>
  );
};

export default Subtasks;
