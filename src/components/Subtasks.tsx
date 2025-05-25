import { Subtask } from '../types/tasks';
import SubtaskRow from './SubtaskRow';

type SubtasksProps = {
  subtasks: Subtask[];
  parent: number;
  refreshProgress: () => Promise<void>;
};
const Subtasks = ({ subtasks, parent, refreshProgress }: SubtasksProps) => {
  return (
    <div className='ml-10 flex flex-col gap-2 md:ml-20'>
      {subtasks.map((subtask) => (
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
