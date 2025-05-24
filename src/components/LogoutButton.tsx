import useAuth from '../context/AuthContext/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={() => logout()}
      className='inline-flex h-12 items-center gap-2 rounded-lg bg-red-400 px-4 py-2 font-medium text-white shadow transition duration-300 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25'
        />
      </svg>
      <span className='hidden md:block'>Logout</span>
    </button>
  );
};

export default LogoutButton;
