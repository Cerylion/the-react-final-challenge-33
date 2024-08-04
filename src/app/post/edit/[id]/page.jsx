'use client'
import PostEditForm from "@/components/postEditForm";
import { useAuth } from '../../../../context/AuthContext'; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditPostPage({ params }) {
  const { token } = useAuth(); 
  const router = useRouter(); 

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4xl font-bold text-center'>Edit Post</h1>
      <PostEditForm id={params.id} />
    </main>
  );
}
