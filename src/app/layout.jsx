'use client'
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Posts</title>
        <meta name="dev.to clone" content="Connect backend to front and consume the api, make the best with Next and React." />
        <link rel="stylesheet" href="./css/main.css"></link>
      </head>
      <body className="bg-white text-black flex flex-col">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
