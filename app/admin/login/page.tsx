'use client'

import React from 'react'
import LoginModal from './LoginModal'
import { SessionProvider} from 'next-auth/react'

const AdminLogin = () => {
  return (
    <SessionProvider>
      <div className='min-h-screen mt-8 flex justify-center items-center'>
        <div className='w-min md:w-1/3 px-12 py-8 rounded-lg border border-stone-200 shadow-md'>
          <h1 className='whitespace-nowrap font-bold text-2xl text-stone-700'>Admin</h1>
          <LoginModal />
        </div>
      </div>
    </SessionProvider>
  )
}

export default AdminLogin