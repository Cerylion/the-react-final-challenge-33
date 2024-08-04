'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; 
import { useRouter } from 'next/navigation'; 

export default function Header() {
  const { token, updateAuth } = useAuth();
  const router = useRouter(); 

  const handleLogout = () => {
    updateAuth(null, null); 
    router.push('/'); 
  };

  const handleCreate = () => {
    router.push('/post/create'); 
  };

  return (
    <div className='flex flex-row gap-11'>
      {/* Logo */}
      <Link href='/'>Home</Link>
      
      <section>
        {/* Search Input */}
        <input type="text" placeholder='Search' className="border p-2 rounded" />
      </section>

      {/* Conditional Rendering */}
      {!token ? (
        <>
          <p>
            <Link href='/login'>Login</Link>
          </p>
          <p>
            <Link href='/register'>Register</Link>
          </p>
        </>
      ) : (
        <>
          <button 
            onClick={handleCreate} 
            className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
          >
            Create Post
          </button>
          <button 
            onClick={handleLogout} 
            className='bg-red-500 text-white p-2 rounded hover:bg-red-400'
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
