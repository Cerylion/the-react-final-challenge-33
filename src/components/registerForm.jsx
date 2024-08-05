'use client'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation';


export default function RegisterForm () {

  const [ showPassword, setShowPassword ] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm()

  const router = useRouter();

  
  async function onSubmit(data) {
    try {
      const payload = JSON.stringify(data)
      
      const response = await fetch(`https://api.thechainlair.com/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: payload
      })

      if (response.ok) {
        console.log('Register succesfull')
        alert('Register succesfull')
        router.push('/')
      }

    } catch (error) {
      console.error("Register error: ", error)
    }
  }

  function handlePasswordShow() {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full', {
      'border-red-500': errors.root?.credentials
    })}>

      <input type="text" placeholder='email'
      className='border border-white/50 rounded p-2 text-black'
      {...register('email', {
        required: { value: true, message: "Email required" }
      })} />

      <section className='flex fex-row'>
        <input type={ showPassword ? 'text' :	'password'}
        placeholder='password'
        className='border border-white/50 rounded p-2 text-black'
        {...register("password", {
          required: { value: true, message: "Password required" }
        })} />

        <span
        className='text-xs text-white/50 cursor-pointer hover:text-white'
        onClick={handlePasswordShow}
        > { showPassword ? '🙉 hide' : '🙈 show'} password</span>
      </section>

      <input type="text" placeholder='user name'
      className='border border-white/50 rounded p-2 text-black'
      {...register('userName', {
        required: { value: true, message: "User Name required" }
      })} />

      <input type="text" placeholder='link to profile pic'
      className='border border-white/50 rounded p-2 text-black'
      {...register('profilePic', {
        required: { value: true, message: "User Pic required" }
      })} />

      <button
      className='bg-teal-500 p-2 text-black hover:bg-teal-300'
      >Register</button>
    </form>  
  )
}