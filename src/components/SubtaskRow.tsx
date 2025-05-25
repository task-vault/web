import { useState } from 'react';
import { Subtask } from '../types/tasks';
import SubtaskActionButtons from './SubtaskActionButtons';
import useTasks from '../context/TasksContext/useTasks';
import EditIcon from './EditIcon';

type SubtaskRowProps = {
  subtask: Subtask;
  parent: number;
  refreshProgress: () => Promise<void>;
  setCreating?: React.Dispatch<React.SetStateAction<boolean>>;
};
const SubtaskRow = ({
  subtask,
  parent,
  refreshProgress,
  setCreating,
}: SubtaskRowProps) => {
  const { editSubtask, createSubtask } = useTasks();
  const [editing, setEditing] = useState(subtask.id === -1);
  const [title, setTitle] = useState(subtask.title);

  const handleBlur = async () => {
    const temp = title.trim();
    if (temp === '' || temp === subtask.title) {
      setEditing(false);
      setTitle(subtask.title);
      return;
    }

    if (subtask.id === -1) {
      try {
        await createSubtask(parent, temp);
        setCreating?.(false);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setEditing(false);
      }
      return;
    }

    try {
      await editSubtask(subtask.id, parent, temp);
      setTitle(temp);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
      setTitle(subtask.title);
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex w-full items-center'>
        <span className='mr-2 text-lg font-semibold'>&minus;</span>
        {editing ? (
          <input
            type='text'
            className='text-md w-36 rounded-md border border-gray-300 p-2 font-semibold text-blue-950 focus:border-blue-500 focus:outline-none md:w-44 lg:w-52 xl:w-60'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <>
            <span className='text-md min-w-28 font-semibold text-blue-950'>
              {title}
            </span>
            {subtask.completed === false && (
              <span
                className='ml-4 cursor-pointer text-gray-500 hover:text-blue-500'
                onClick={() => setEditing(true)}
              >
                <EditIcon />
              </span>
            )}
          </>
        )}
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
