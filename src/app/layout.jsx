import Header from '../components/header'
import "./globals.css";





export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className='bg-white text-black'>
        <Header/>
        {children}

      </body>
      
    </html>
  );
}
