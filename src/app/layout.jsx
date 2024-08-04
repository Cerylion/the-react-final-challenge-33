'use client'
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Posts</title>
        <meta name="description" content="Description of my Posts" />
      </head>
      <body className="bg-white text-black">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
