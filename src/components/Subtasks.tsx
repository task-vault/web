import { Subtask } from '../types/tasks';

type SubtasksProps = {
  subtasks: Subtask[];
};
const Subtasks = ({ subtasks }: SubtasksProps) => {
  return (
    <div className='ml-20 flex flex-col gap-2'>
      {subtasks.map((subtask) => (
        <div key={subtask.id}>
          <span className='mr-2 text-lg font-semibold'>&minus;</span>
          <span className='text-md font-semibold text-blue-950'>
            {subtask.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Subtasks;
