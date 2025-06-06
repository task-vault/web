import { useState } from 'react';
import { Link } from 'react-router';
import TaskVaultIcon from '../components/TaskVaultIcon';
import useAuth from '../context/AuthContext/useAuth';

export const emailRegex = /\S+@\S+\.\S+/;

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldStayLoggedIn, setShouldStayLoggedIn] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const isEmailValid = email && emailRegex.test(email);
  const isFormValid = isEmailValid && password;

  const handleLogin = async () => {
    setErrors([]);
    if (!isFormValid) return;

    try {
      await login(email, password, shouldStayLoggedIn);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message.split(';'));
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };

  return (
    <section className='flex min-h-screen items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl lg:max-w-2xl lg:p-12'>
        <h1 className='mb-6 text-center text-3xl font-bold text-blue-950 lg:text-4xl'>
          Login
          <TaskVaultIcon />
        </h1>

        <div className='mb-4'>
          {errors.map((error, index) => (
            <p
              className='mb-1 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600'
              key={index}
            >
              {error}
            </p>
          ))}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='mb-1 block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            autoComplete='email'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='password'
            className='mb-1 block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            autoComplete='current-password'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
          />
        </div>

        <div className='mb-6 flex items-center space-x-2'>
          <input
            type='checkbox'
            id='shouldStayLoggedIn'
            checked={shouldStayLoggedIn}
            onChange={(e) => setShouldStayLoggedIn(e.target.checked)}
            className='h-4 w-4 rounded-md lg:h-5 lg:w-5'
          />
          <label
            htmlFor='shouldStayLoggedIn'
            className='text-sm text-gray-700'
          >
            Remember me
          </label>
        </div>

        <button
          disabled={!isFormValid || isLoading}
          onClick={handleLogin}
          className={`w-full rounded-lg py-2 font-medium transition duration-300 ${
            isFormValid
              ? 'bg-blue-900 text-white hover:bg-blue-950'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          Log In
        </button>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-green-600 hover:text-green-700 hover:underline'
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
