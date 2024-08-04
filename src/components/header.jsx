"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'next/navigation';


export default function Header() {
  const { token, updateToken } = useAuth();
  const router = useRouter();


  const handleLogout = () => {
    updateToken(null);
    router.push('/'); 
  };

  return (
    <div className="flex flex-row gap-11">
      {/* Logo */}
      <Link href="/">Home</Link>

      <section>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
        />
      </section>

      {/* Conditional Rendering */}
      {!token ? (
        <>
          <p>
            <Link href="/login">Login</Link>
          </p>
          <p>
            <Link href="/register">Register</Link>
          </p>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
        >
          Logout
        </button>
      )}
    </div>
  );
}
