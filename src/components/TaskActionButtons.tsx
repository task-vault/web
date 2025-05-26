import useTasks from '../context/TasksContext/useTasks';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import SaveIcon from './SaveIcon';
import TickIcon from './TickIcon';
import UncompleteIcon from './UncompleteIcon';

type TaskActionButtonsProps = {
  id: number;
  completed: boolean;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  save: () => Promise<void>;
};
const TaskActionButtons = ({
  id,
  completed,
  editing,
  setEditing,
  save,
}: TaskActionButtonsProps) => {
  const { complete, uncomplete, deleteTask } = useTasks();
  return (
    <div className='flex justify-between md:pr-2 lg:pr-4 xl:pr-6'>
      <button
        onClick={() => deleteTask(id)}
        className='inline-flex items-center gap-2 rounded-lg bg-red-400 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none'
      >
        <DeleteIcon />
        Delete
      </button>
      {editing ? (
        <button
          onClick={save}
          className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none'
        >
          <SaveIcon />
          Save
        </button>
      ) : (
        completed === false && (
          <button
            onClick={() => setEditing(true)}
            className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none'
          >
            <EditIcon />
            Edit
          </button>
        )
      )}
      {completed ? (
        <button
          onClick={() => uncomplete(id)}
          className='inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none'
        >
          <UncompleteIcon />
          Uncomplete
        </button>
      ) : (
        <button
          onClick={() => complete(id)}
          className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none'
        >
          <TickIcon />
          Complete
        </button>
      )}
    </div>
  );
};

export default TaskActionButtons;
