'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const AdminLogin = () => {
  const router = useRouter()

  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  const submitCredential = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordInput !== confirmPasswordInput) alert('Password doesn\'t match')

    try {
      const res = await signIn("credentials", {
        password: passwordInput,
        redirect: false,
        callbackUrl: `${location.origin}/admin/blog`,
      })

      if (res?.error === 'CredentialsSignin' && res.url === null) {
        // 
      } else if (res?.error === null && res.url !== null) {
        // 

        router.push(res.url)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='min-h-screen mt-8 flex justify-center items-center'>
      <div className='w-min md:w-1/3 px-12 py-8 rounded-lg border border-stone-200 shadow-md'>
        <h1 className='whitespace-nowrap font-bold text-2xl text-stone-700'>Admin</h1>
        
        <form onSubmit={(e) => submitCredential(e)} className='my-8 flex flex-col'>
          <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className='my-2 p-2 border rounded-md'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              className='my-2 p-2 border rounded-md'
            />
          </div>
          <div className='flex justify-center'>
            <button type="submit" className='
              w-full mt-8 py-2 rounded-md bg-stone-200 hover:bg-stone-300
              font-semibold
            '>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin