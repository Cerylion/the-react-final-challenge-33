'use client';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth'; 

export default function LoginForm() {
  const router = useRouter();
  const { updateToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    const payload = JSON.stringify(data);
    console.log(payload);
    try {
      const response = await fetch('https://api.thechainlair.com/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      const json = await response.json();

      if (response.ok && json.data.token) {
        console.log('Login successful');
        updateToken(`json.data.token`); 
        router.push('/'); 
      } else {
        console.error('Login failed');
        setError('root.credentials', { type: 'manual', message: "You're doing it the wrong way..." });
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  function handlePasswordShow() {
    setShowPassword(!showPassword);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx('border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full', {
        'border-red-500': errors.root?.credentials,
      })}
    >
      <input
        type="text"
        placeholder="email"
        className="border border-white/50 rounded p-2 text-black"
        {...register('email', {
          required: { value: true, message: 'Email required' },
        })}
      />

      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="password"
        className="border border-white/50 rounded p-2 text-black"
        {...register('password', {
          required: {
            value: true,
            message: 'Password required',
          },
        })}
      />

      <span
        className="text-xs text-white/50 cursor-pointer hover:text-white"
        onClick={handlePasswordShow}
      >
        {showPassword ? '🙉 hide' : '🙈 show'} password
      </span>

      <button className="bg-teal-500 p-2 text-black hover:bg-teal-300">
        Enter
      </button>

      {errors.root?.credentials && (
        <p className="text-red-500 text-center">Your Credentials Are Punked</p>
      )}
    </form>
  );
}
