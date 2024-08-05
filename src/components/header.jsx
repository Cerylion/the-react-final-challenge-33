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
    <div className='flex flex-row justify-center fixed top-0 w-full flex-wrap'>
      <nav className='navbarMenu flex items-center bg-white border border-[#dbd6d6]'>

        <Link href='/'><img className="imgMenu box-border w-[47px]"  src="https://media.dev.to/cdn-cgi/image/quality=100/htt…loads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" ></img></Link>
        
        <section>
          {/* Search Input */}
          <input type="text" placeholder='Search...' className="w-[380px] h-[30] m-[10px] border border-[#d6c8c8] p-2 rounded inline-block leading-[20px] relative left-[25px]" />
        </section>

        {/* Conditional Rendering */}
        {!token ? (
          <section className="navRight ml-[20px] flex flex-row">
            <p>
              <Link href='/login'
              className='p-[10px] relative hover:bg-[#e0e0e0] hover:text-[#2424d1] hover:underline'
              >Log in</Link>
            </p>
            <p>
              <Link href='/register'
              className='p-[10px] border border-[#2424d1] bg-white rounded text-[#2424d1] relative hover:bg-[#2424d1] hover:text-[white] hover:underline'
              >Create account</Link>
            </p>
          </section>
          
        ) : (
          <>
            <button 
              onClick={handleCreate} 
              className="login bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Create Post
            </button>
            <button 
              onClick={handleLogout} 
              className='createaccount bg-red-500 text-white p-2 rounded hover:bg-red-400'
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
