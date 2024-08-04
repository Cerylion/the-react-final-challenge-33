'use client'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function postEditForm ( { title='', user='', image='', body='' }) {

  useEffect(() => {
    const tkn = localStorage.getItem('token')
      if (!tkn) {
        redirect('/login')
      }
  }, []) 

  const [ showPassword, setShowPassword ] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm()
  
  async function onSubmit(data) {
    try {
      const payload = JSON.stringify(data)
      
      const response = await fetch(`https://api.thechainlair.com/posts/id`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: payload
      })
      console.log('Post succesfully updated')
      alert('Post succesfully updated')

    } catch (error) {
      console.error("Register error: ", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full', {
      'border-red-500': errors.root?.credentials
    })}>

      <input type="text" placeholder='title' value={title}
      className='border border-white/50 rounded p-2 text-black'
      {...register('title', {
        required: { value: true, message: "Title required" }
      })} />

      <input type="text" placeholder='user name' value={user}
      className='border border-white/50 rounded p-2 text-black'
      {...register('user', {
        required: { value: true, message: "User Name required" }
      })} />

      <input type="text" placeholder='link to profile pic' value={image}
      className='border border-white/50 rounded p-2 text-black'
      {...register('image', {
        required: { value: true, message: "Post Image required" }
      })} />

      <input type="text" placeholder='Article body' value={body}
      className='border border-white/50 rounded p-2 text-black'
      {...register('body', {
        required: { value: true, message: "Post Image required" }
      })} />

      <button
      className='bg-teal-500 p-2 text-black hover:bg-teal-300'
      >Register</button>
    </form>  
  )
}