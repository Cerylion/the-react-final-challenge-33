'use client';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; 

export default function CreatePostForm({ title = '', user = '', image = '', body = '' }) {
  const { token } = useAuth(); 

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  async function onSubmit(data) {
    try {
      const payload = JSON.stringify(data);
      const response = await fetch('https://api.thechainlair.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`,
        },
        body: payload,
      });

      if (response.ok) {
        console.log('Post successfully created');
        alert('Post successfully created');
        router.push('/');
      } else {
        const json = await response.json();
        console.error('Failed to create post:', json);
        setError('root.credentials', { type: 'manual', message: json.message || 'Failed to create post' });
      }
    } catch (error) {
      console.error('Post creation error: ', error);
      setError('root.credentials', { type: 'manual', message: 'An error occurred while creating the post.' });
    }
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
        placeholder="Title"
        className="border border-white/50 rounded p-2 text-black"
        {...register('title', {
          required: { value: true, message: 'Title required' },
        })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        placeholder="Link to profile pic"
        className="border border-white/50 rounded p-2 text-black"
        {...register('image', {
          required: { value: true, message: 'Post Image required' },
        })}
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

      <input
        type="text"
        placeholder="Article body"
        className="border border-white/50 rounded p-2 text-black"
        {...register('body', {
          required: { value: true, message: 'Article body required' },
        })}
      />
      {errors.body && <p className="text-red-500">{errors.body.message}</p>}

      <button className="bg-teal-500 p-2 text-black hover:bg-teal-300">
        Create Post
      </button>

      {errors.root?.credentials && (
        <p className="text-red-500 text-center">{errors.root.credentials.message}</p>
      )}
    </form>
  );
}
