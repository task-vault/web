import LogoutButton from './LogoutButton';
import StatusbarLogo from './StatusbarLogo';

const Statusbar = () => {
  return (
    <div className='bg-lavender flex h-32 w-screen items-center justify-between pr-4 shadow-md lg:px-20'>
      <StatusbarLogo />
      <LogoutButton />
    </div>
  );
};

export default Statusbar;
