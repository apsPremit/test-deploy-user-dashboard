'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png';
import Link from 'next/link';
import { UserAuth } from '@/context/AuthProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const ResetForm = () => {
  const { passwordReset } = UserAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async ({ email }) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/auth/send_reset_email`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data?.error) {
        setLoading(false);
        reset();
        return setError(data?.error);
      }
      setLoading(false);
      reset();
      toast.success(data?.message);
    } catch (error) {
      setLoading(false);
      reset();
      setError('server error');
    }
  };

  return (
    <div className='w-full rounded-lg bg-white p-12 md:w-1/2 lg:w-1/3'>
      <div className=''>
        <div className='flex flex-col items-center'>
          <Image src={logo} alt='logo' width={56} height={50} />
          <h2 className='my-4 text-3xl'>Forgot Password?</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action=''>
          {/* ??????????????????email ****** */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='otp_email'>
              Email<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='otp_email'
              className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.email?.message}
              </p>
            )}
          </div>
          {error && (
            <p className='my-2 text-center text-sm text-red-500'>{error}</p>
          )}
          {loading && (
            <div className='flex items-center justify-center text-xl text-main'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}

          <div>
            <input
              disabled={loading}
              className='my-5 w-full cursor-pointer rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
              type='submit'
              value='Send Reset Email'
            />
          </div>
        </form>

        <div className='dark:text-gray-500 flex items-center py-6  uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-shadow after:ml-6 after:flex-[1_1_0%] after:border-t after:border-shadow'>
          Or
        </div>
        <p className='text-center font-semibold'>
          Try another way for{' '}
          <Link className='text-main' href='/login'>
            Login
          </Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
};

export default ResetForm;
