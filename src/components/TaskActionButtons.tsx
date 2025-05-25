import useTasks from '../context/TasksContext/useTasks';

type TaskActionButtonsProps = {
  id: number;
  completed: boolean;
};
const TaskActionButtons = ({ id, completed }: TaskActionButtonsProps) => {
  const { complete, uncomplete, deleteTask } = useTasks();
  return (
    <div className='flex justify-between px-4'>
      <button
        onClick={() => deleteTask(id)}
        className='inline-flex items-center gap-2 rounded-lg bg-red-400 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none'
      >
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
        Delete
      </button>
      {completed ? (
        <button
          onClick={() => uncomplete(id)}
          className='inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 4v16h16V4H4zm4 8h8'
            />
          </svg>
          Uncomplete
        </button>
      ) : (
        <button
          onClick={() => complete(id)}
          className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            strokeWidth={2.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
          Complete
        </button>
      )}
    </div>
  );
};

export default TaskActionButtons;
