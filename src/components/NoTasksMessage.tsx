import { TaskState } from '../types/tasks';

type NoTasksMessageProps = {
  state: TaskState;
};
const NoTasksMessage = ({ state }: NoTasksMessageProps) => {
  return (
    <p className='text-md text-center text-blue-950 lg:text-lg'>
      Your {state} tasks will appear here.
    </p>
  );
};

export default NoTasksMessage;
