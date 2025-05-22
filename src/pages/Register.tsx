import { useState } from 'react';
import { Link } from 'react-router';
import { emailRegex } from './Login';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isPasswordValid =
    password && confirmPassword && password === confirmPassword;
  const isEmailValid = email && emailRegex.test(email);
  const isFormValid = firstName && lastName && isEmailValid && isPasswordValid;

  return (
    <section className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
        <h1 className='mb-6 text-center text-3xl font-bold text-blue-700'>
          Register
        </h1>

        {error && (
          <p className='mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label
            htmlFor='firstName'
            className='mb-1 block text-sm font-medium text-gray-700'
          >
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Enter your first name'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='lastName'
            className='mb-1 block text-sm font-medium text-gray-700'
          >
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Enter your last name'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
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

        <div className='mb-6'>
          <label
            htmlFor='confirmPassword'
            className='mb-1 block text-sm font-medium text-gray-700'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className='mt-1 text-sm text-red-600'>Passwords do not match</p>
          )}
        </div>

        <button
          disabled={!isFormValid}
          className={`w-full rounded-lg py-2 font-medium transition duration-300 ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          onClick={() => {
            //register request
          }}
        >
          Register
        </button>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-green-600 hover:text-green-700 hover:underline'
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
