import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { emailRegex } from './Login';
import TaskVaultLogo from '../components/TaskVaultLogo';
import useAuth from '../context/AuthContext/useAuth';

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigete = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isPasswordValid =
    password && confirmPassword && password === confirmPassword;
  const isEmailValid = email && emailRegex.test(email);
  const isFormValid = firstName && lastName && isEmailValid && isPasswordValid;

  const handleRegister = async () => {
    setErrors([]);
    if (!isFormValid) return;
    try {
      await register(firstName, lastName, email, password);
      navigete('/login');
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message.split(';'));
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };

  return (
    <section className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl lg:max-w-2xl lg:p-12'>
        <h1 className='mb-6 text-center text-3xl font-bold text-blue-950 lg:text-4xl'>
          Register
          <TaskVaultLogo />
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
            autoComplete='given-name'
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
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
            autoComplete='family-name'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
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
            autoComplete='email'
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
            required
            autoComplete='new-password'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
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
            autoComplete='off'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none'
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className='mt-1 text-sm text-red-600'>Passwords do not match</p>
          )}
        </div>

        <button
          disabled={!isFormValid || isLoading}
          onClick={handleRegister}
          className={`w-full rounded-lg py-2 font-medium transition duration-300 ${
            isFormValid
              ? 'bg-blue-900 text-white hover:bg-blue-950'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
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
