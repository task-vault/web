import CurrentUser from './CurrentUser';
import LogoutButton from './LogoutButton';
import StatusbarLogo from './StatusbarLogo';

const Statusbar = () => {
  return (
    <div className='bg-lavender flex h-32 w-screen items-center justify-between pr-4 shadow-md md:px-10 lg:pr-28 lg:pl-20'>
      <StatusbarLogo />
      <div className='flex gap-4 md:gap-10 lg:gap-16'>
        <CurrentUser />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Statusbar;
