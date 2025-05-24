import useAuth from '../context/AuthContext/useAuth';

const ProfileIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.7}
    stroke='currentColor'
    className='size-10 text-blue-950'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    />
  </svg>
);

const CurrentUser = () => {
  const { user } = useAuth();
  const { firstName, lastName } = user!;

  return (
    <div className='flex items-center gap-2'>
      <ProfileIcon />
      <div className='flex flex-col items-center text-lg font-bold text-blue-950 md:flex-row md:gap-2 md:text-xl lg:text-2xl'>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
    </div>
  );
};

export default CurrentUser;
