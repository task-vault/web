import useTasks from '../context/TasksContext/useTasks';
import DeleteIcon from './DeleteIcon';
import TickIcon from './TickIcon';
import UncompleteIcon from './UncompleteIcon';

type SubtaskActionButtonsProps = {
  id: number;
  completed: boolean;
  parent: number;
  refreshProgress: () => Promise<void>;
};
const SubtaskActionButtons = ({
  id,
  completed,
  parent,
  refreshProgress,
}: SubtaskActionButtonsProps) => {
  const { completeSubtask, uncompleteSubtask, deleteSubtask } = useTasks();
  //after each action, refresh the progress of the parent task
  const handleAction = async () => {
    await refreshProgress();
  };
  const completeSubtaskHandler = async () => {
    await completeSubtask(id, parent);
    await handleAction();
  };
  const uncompleteSubtaskHandler = async () => {
    await uncompleteSubtask(id, parent);
    await handleAction();
  };
  const deleteSubtaskHandler = async () => {
    await deleteSubtask(id, parent);
    await handleAction();
  };
  return (
    <div className='flex gap-6 md:pr-2 lg:pr-4'>
      <button
        onClick={deleteSubtaskHandler}
        className='inline-flex items-center gap-2 rounded-lg bg-red-400 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none'
      >
        <DeleteIcon />
      </button>
      {completed ? (
        <button
          onClick={uncompleteSubtaskHandler}
          className='inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none'
        >
          <UncompleteIcon />
        </button>
      ) : (
        <button
          onClick={completeSubtaskHandler}
          className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow transition duration-300 hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none'
        >
          <TickIcon />
        </button>
      )}
    </div>
  );
};

export default SubtaskActionButtons;
