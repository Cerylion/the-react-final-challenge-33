'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '../../../context/AuthContext';
import CreatePostForm from "@/components/createPostForm";

export default function CreatePostPage() {
  const { token } = useAuth(); 
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push('/login'); 
    }
  }, [token, router]); 

  return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4xl font-bold text-center'>Create Post</h1>
      <CreatePostForm />
    </main>
  );
}
