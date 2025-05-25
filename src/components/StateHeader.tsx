import { TaskState } from '../types/tasks';

const ArrowOpen = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='currentColor'
    className='size-6'
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
    className='size-6'
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
    <div className='flex w-32 items-center justify-start gap-2 text-lg font-semibold select-none md:text-xl lg:text-2xl'>
      <div
        onClick={toggle}
        className='cursor-pointer transition-transform duration-200 hover:scale-[135%]'
      >
        {isOpen ? <ArrowOpen /> : <ArrowClosed />}
      </div>
      <span className='capitalize'>{state}</span>
    </div>
  );
};
export default StateHeader;
