
import RegisterForm from "@/components/registerForm"

export default function LoginPage () {

  return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4x1 font-bold text-center'>Register New User</h1>
      <RegisterForm/>
    </main>
  )
}