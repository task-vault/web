import { useCallback, useEffect, useState } from 'react';
import { Task } from '../types/tasks';
import formatDeadline from '../utils/formatDeadline';
import Subtasks from './Subtasks';
import useTasks from '../context/TasksContext/useTasks';
import TaskActionButtons from './TaskActionButtons';

type ParentTaskProps = {
  task: Task;
  isCreating?: boolean;
  setCreating?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ParentTask = ({ task, isCreating, setCreating }: ParentTaskProps) => {
  const { getProgress, editTask, createTask } = useTasks();
  const [progress, setProgress] = useState(0);
  const [editing, setEditing] = useState(isCreating || false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [deadline, setDeadline] = useState(task.deadline || '');

  const refreshProgress = useCallback(async () => {
    const progressValue = await getProgress(task.id);
    setProgress(progressValue);
  }, [getProgress, task.id]);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress, task.completed]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (trimmedTitle === '') {
      setEditing(false);
      setTitle(task.title);
      setDescription(task.description || '');
      setDeadline(task.deadline || '');
      return;
    }
    const isoDeadline = deadline ? new Date(deadline).toISOString() : undefined;

    if (task.id === -1) {
      try {
        await createTask(trimmedTitle, trimmedDescription, isoDeadline);
        setCreating?.(false);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
        setTitle('');
        setDescription('');
        setDeadline('');
      } finally {
        setEditing(false);
      }
      return;
    }

    try {
      await editTask(task.id, {
        title: trimmedTitle,
        description:
          trimmedDescription.length > 0 ? trimmedDescription : undefined,
        deadline: isoDeadline,
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
      setTitle(task.title);
      setDescription(task.description || '');
      setDeadline(task.deadline || '');
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className='mx-auto flex w-full cursor-default flex-col gap-4 self-center rounded-lg bg-[#8af7] p-4 shadow-md transition-shadow duration-200 hover:shadow-lg md:w-[80%] lg:w-[60%]'>
      <div className='flex items-center gap-4'>
        <div>
          {editing ? (
            <input
              type='text'
              className='text-md w-36 rounded-md border border-gray-300 p-2 font-semibold text-blue-950 focus:border-blue-500 focus:outline-none md:w-44 lg:w-52 xl:w-60'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              autoFocus
            />
          ) : (
            <h3 className='text-lg leading-10 font-bold tracking-wide text-blue-950'>
              {title}
            </h3>
          )}
          {editing ? (
            <textarea
              className='mt-2 w-[90%] rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none'
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Add a description...'
            />
          ) : (
            <p className='text-md text-gray-600'>{description}</p>
          )}
        </div>
        <div className='ml-auto flex min-w-[30%] flex-col items-center justify-center gap-4 pr-4 text-center xl:p-0'>
          <div className='text-sm text-gray-700'>
            <p className='text-[1.1rem] leading-10 font-semibold'>Deadline</p>
            {editing ? (
              <input
                type='datetime-local'
                className='w-max rounded-md border border-gray-300 p-3 text-sm text-blue-950 focus:border-blue-500 focus:outline-none'
                value={
                  deadline.includes('.')
                    ? deadline.split('.')[0]
                    : `${deadline}`
                }
                onChange={(e) => setDeadline(e.target.value)}
                autoFocus
              />
            ) : (
              <p className='text-sm font-bold text-blue-950'>
                {deadline.length > 0
                  ? formatDeadline(deadline)
                  : 'No deadline set'}
              </p>
            )}
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
        editing={editing}
        setEditing={setEditing}
        save={handleSave}
      />
      {!isCreating && (
        <Subtasks
          subtasks={task.subtasks}
          parent={task.id}
          refreshProgress={refreshProgress}
        />
      )}
    </div>
  );
};

export default ParentTask;
