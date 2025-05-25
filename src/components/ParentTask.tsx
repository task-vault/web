import { Task } from '../types/tasks';
import formatDeadline from '../utils/formatDeadline';
import Subtasks from './Subtasks';

type ParentTaskProps = {
  task: Task;
};
const ParentTask = ({ task }: ParentTaskProps) => {
  return (
    <div className='mx-auto flex w-full cursor-default flex-col gap-2 self-center rounded-lg bg-[#8af7] p-4 shadow-md transition-shadow duration-200 hover:shadow-lg md:w-[80%] lg:w-[60%]'>
      <div className='flex items-center gap-4'>
        <div>
          <h3 className='text-lg leading-10 font-bold tracking-wide text-blue-950'>
            {task.title}
          </h3>
          <p className='text-md text-gray-600'>{task.description}</p>
        </div>
        <div className='ml-auto min-w-[30%] text-center text-sm text-gray-700'>
          <p className='text-[1.1rem] leading-10 font-semibold'>Deadline</p>
          <p className='text-sm font-bold text-blue-950'>
            {task.deadline ? formatDeadline(task.deadline) : 'No deadline set'}
          </p>
        </div>
      </div>
      <Subtasks subtasks={task.subtasks} />
    </div>
  );
};

export default ParentTask;
