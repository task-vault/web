import { Link } from 'react-router';
import TaskVaultIcon from '../components/TaskVaultIcon';

const NotFound = () => {
  return (
    <section className='flex min-h-screen items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl lg:max-w-xl lg:p-16'>
        <h1 className='mb-4 text-5xl font-bold text-blue-950 lg:text-6xl'>
          <TaskVaultIcon />
          <span className='mx-2'>404</span>
          <TaskVaultIcon />
        </h1>
        <p className='mb-2 text-lg text-gray-700 lg:text-xl'>Page not found</p>
        <p className='mb-6 text-sm text-gray-500 lg:text-base'>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to='/'
          className='inline-block rounded-lg bg-blue-900 px-6 py-2 font-medium text-white transition duration-300 hover:bg-blue-950'
        >
          Go back to the homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
