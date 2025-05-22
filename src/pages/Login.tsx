import { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldStayLoggedIn, setShouldStayLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
        <h1 className='mb-6 text-center text-3xl font-bold text-blue-700'>
          Login
        </h1>

        {error && (
          <p className='mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600'>
            {error}
          </p>
        )}

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
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none'
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
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>

        <div className='mb-6 flex items-center'>
          <input
            type='checkbox'
            id='shouldStayLoggedIn'
            checked={shouldStayLoggedIn}
            onChange={(e) => setShouldStayLoggedIn(e.target.checked)}
            className='mr-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-400'
          />
          <label
            htmlFor='shouldStayLoggedIn'
            className='text-sm text-gray-600'
          >
            Remember me
          </label>
        </div>

        <button
          className='w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition duration-300 hover:bg-blue-700'
          onClick={() => {
            /* your login handler here */
          }}
        >
          Log In
        </button>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
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
