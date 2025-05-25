import { Subtask } from '../types/tasks';
import SubtaskActionButtons from './SubtaskActionButtons';

type SubtaskRowProps = {
  subtask: Subtask;
  parent: number;
  refreshProgress: () => Promise<void>;
};
const SubtaskRow = ({ subtask, parent, refreshProgress }: SubtaskRowProps) => {
  return (
    <div className='flex justify-between'>
      <div>
        <span className='mr-2 text-lg font-semibold'>&minus;</span>
        <span className='text-md font-semibold text-blue-950'>
          {subtask.title}
        </span>
      </div>
      <SubtaskActionButtons
        id={subtask.id}
        completed={subtask.completed}
        parent={parent}
        refreshProgress={refreshProgress}
      />
    </div>
  );
};

export default SubtaskRow;
