'use client'

import React, { useState } from 'react'

const AdminLogin = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitCredential = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('')
        const data = await res.json()
    }


  return (
    <div className='min-h-screen mt-8 flex justify-center items-center'>
        <div className='w-min px-12 py-8 rounded-lg border border-stone-200 shadow-md'>
            <p className='whitespace-nowrap font-bold text-2xl text-stone-700'>Admin Panel</p>
            <form onSubmit={(e) => submitCredential(e)} className='my-8'>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='my-2 p-2 border rounded-md'
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="text"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='my-2 p-2 border rounded-md'
                />
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