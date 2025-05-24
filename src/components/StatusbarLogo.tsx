import { useNavigate } from 'react-router';

const StatusbarLogo = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <>
      <img
        src='/task-vault-mobile.png'
        className='h-28 cursor-pointer lg:hidden'
        alt='Task Vault logo'
        onClick={handleLogoClick}
      />
      <img
        src='/task-vault-desktop.png'
        className='hidden h-36 cursor-pointer lg:block'
        alt='Task Vault logo'
        onClick={handleLogoClick}
      />
    </>
  );
};

export default StatusbarLogo;
