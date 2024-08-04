'use client';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; 


export default function PostEditForm({ id }) {
  const [post, setPost] = useState({ title: '', user: '', image: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { token } = useAuth(); 


  const {
    handleSubmit,
    register,
    formState: { errors },
    setError: setFormError,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://api.thechainlair.com/posts/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }

        const data = await response.json();
        setPost(data.data.post);
        reset(data.data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id, reset]);


  async function onSubmit(data) {
    try {
      const payload = JSON.stringify(data);
      const response = await fetch(`https://api.thechainlair.com/posts/${id}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`,
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      console.log('Post successfully updated');
      alert('Post successfully updated');
      router.push('/');
    } catch (error) {
      console.error("Update error: ", error);
      setFormError('root.credentials', { type: 'manual', message: error.message });
    }
  }

  if (loading) return <p>Loading...</p>; 
  if (error) return <p className="text-red-500">{error}</p>; 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx('border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full', {
        'border-red-500': errors.root?.credentials,
      })}
    >

    {/* <input
        type="text"
        placeholder='Title'
        className='border border-white/50 rounded p-2 text-black'
        {...register('user', {
          required: { value: true, message: "User required" },
        })}
      />
      {errors.user && <p className="text-red-500">{errors.user.message}</p>} */}
      
      <input
        type="text"
        placeholder='Title'
        className='border border-white/50 rounded p-2 text-black'
        {...register('title', {
          required: { value: true, message: "Title required" },
        })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        placeholder='Link to profile pic'
        className='border border-white/50 rounded p-2 text-black'
        {...register('image', {
          required: { value: true, message: "Post Image required" },
        })}
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

      <input
        type="text"
        placeholder='Article body'
        className='border border-white/50 rounded p-2 text-black'
        {...register('body', {
          required: { value: true, message: "Article body required" },
        })}
      />
      {errors.body && <p className="text-red-500">{errors.body.message}</p>}

      <button className='bg-teal-500 p-2 text-black hover:bg-teal-300'>
        Update Post
      </button>

      {errors.root?.credentials && (
        <p className="text-red-500 text-center">{errors.root.credentials.message}</p>
      )}
    </form>
  );
}
