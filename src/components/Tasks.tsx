import { taskStates } from '../types/tasks';
import State from './State';

const Tasks = () => {
  return (
    <div className='flex w-full flex-col items-center justify-start overflow-auto py-20 md:py-24 lg:py-28'>
      {taskStates.map((state) => (
        <State
          key={state}
          state={state}
        />
      ))}
    </div>
  );
};

export default Tasks;
