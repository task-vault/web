import { useEffect, useState } from 'react';
import { Task } from '../types/tasks';
import formatDeadline from '../utils/formatDeadline';
import Subtasks from './Subtasks';
import useTasks from '../context/TasksContext/useTasks';
import TaskActionButtons from './TaskActionButtons';

type ParentTaskProps = {
  task: Task;
};
const ParentTask = ({ task }: ParentTaskProps) => {
  const { getProgress } = useTasks();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getTaskProgress = async () => {
      const progressValue = await getProgress(task.id);
      setProgress(progressValue);
    };
    getTaskProgress();
  }, [task.completed, getProgress, task.id]);

  return (
    <div className='mx-auto flex w-full cursor-default flex-col gap-4 self-center rounded-lg bg-[#8af7] p-4 shadow-md transition-shadow duration-200 hover:shadow-lg md:w-[80%] lg:w-[60%]'>
      <div className='flex items-center gap-4'>
        <div>
          <h3 className='text-lg leading-10 font-bold tracking-wide text-blue-950'>
            {task.title}
          </h3>
          <p className='text-md text-gray-600'>{task.description}</p>
        </div>
        <div className='ml-auto flex min-w-[30%] flex-col items-center justify-center gap-4 text-center'>
          <div className='text-sm text-gray-700'>
            <p className='text-[1.1rem] leading-10 font-semibold'>Deadline</p>
            <p className='text-sm font-bold text-blue-950'>
              {task.deadline
                ? formatDeadline(task.deadline)
                : 'No deadline set'}
            </p>
          </div>
          {task.subtasks.length > 1 && (
            <div className='text-sm text-gray-700'>
              <p className='text-[1.1rem] leading-10 font-semibold'>Progress</p>
              <p className='text-md font-bold text-blue-950'>{progress}%</p>
            </div>
          )}
        </div>
      </div>
      <TaskActionButtons
        id={task.id}
        completed={task.completed}
      />
      <Subtasks subtasks={task.subtasks} />
    </div>
  );
};

export default ParentTask;
