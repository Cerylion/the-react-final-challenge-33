
import LoginForm from "@/components/loginForm"

export default function LoginPage () {

  return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4x1 font-bold text-center'>Login</h1>
      <LoginForm/>
    </main>
  )
}