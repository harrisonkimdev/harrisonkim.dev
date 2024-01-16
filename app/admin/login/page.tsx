'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

const AdminLogin = () => {
  const router = useRouter()

  const { data: session, status } = useSession({ required: false })

  const [passwordInput, setPasswordInput] = useState('')

  const submitCredential = async (e: React.FormEvent) => {
    e.preventDefault()

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
        
        { session ? (
          <div className='my-8 flex flex-col justify-center'>
            <button onClick={() => signOut()} className='
              w-min
              mx-auto
              p-3
              rounded-md
              border
              whitespace-nowrap
              font-semibold
            text-stone-800
            bg-stone-100
            hover:bg-stone-200
            '>Sign out</button>
          </div>
        ) : (
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
            <div className='flex justify-center'>
              <button type="submit" className='
                w-full mt-8 py-2 rounded-md bg-stone-200 hover:bg-stone-300
                font-semibold
              '>Submit</button>
            </div>
          </form>
        )}
        
      </div>
    </div>
  )
}

export default AdminLogin