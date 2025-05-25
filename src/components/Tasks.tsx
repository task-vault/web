import { taskStates } from '../types/tasks';
import State from './State';

const Tasks = () => {
  return (
    <div className='flex w-full flex-col items-center justify-start gap-12 overflow-auto py-20 md:gap-14 md:py-24 lg:gap-16 lg:py-28'>
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
