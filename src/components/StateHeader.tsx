import { TaskState } from '../types/tasks';

const ArrowOpen = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='currentColor'
    className='size-8'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m19.5 8.25-7.5 7.5-7.5-7.5'
    />
  </svg>
);

const ArrowClosed = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='currentColor'
    className='size-8'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m8.25 4.5 7.5 7.5-7.5 7.5'
    />
  </svg>
);

type StateHeaderProps = {
  state: TaskState;
  isOpen: boolean;
  toggle: () => void;
};
const StateHeader = ({ state, isOpen, toggle }: StateHeaderProps) => {
  return (
    <div
      onClick={toggle}
      className={`flex w-32 items-center justify-start gap-2 text-lg font-semibold transition-transform duration-200 select-none hover:scale-110 md:w-36 md:text-xl lg:w-40 lg:text-2xl ${
        state === 'completed'
          ? 'text-green-600'
          : state === 'overdue'
            ? 'text-red-400'
            : 'text-blue-950'
      }`}
    >
      {isOpen ? <ArrowOpen /> : <ArrowClosed />}
      <span className='w-full text-center capitalize'>{state}</span>
    </div>
  );
};
export default StateHeader;
