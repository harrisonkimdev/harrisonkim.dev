'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'

const LoginModal = () => {
  const [passwordInput, setPasswordInput] = useState('')
  const [showInvalidPwdMessage, setShowInvalidPwdMessage] = useState(false)
  const [showWrongPwdMessage, setShowWrongPwdMessage] = useState(false)

  const router = useRouter()

  const { data: session, status } = useSession({ required: false })

  useEffect(() => {
    if (passwordInput.length > 0) {
      setShowInvalidPwdMessage(false)
      setShowWrongPwdMessage(false)
    }
  }, [passwordInput])
  
  
  const submitCredential = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordInput.length === 0) setShowInvalidPwdMessage(true)

    try {
      const res = await signIn('credentials', {
        password: passwordInput,
        redirect: false,
        callbackUrl: `${location.origin}/admin/blog`,
      })

      // error handling
      if (res?.error === 'CredentialsSignin' && res.url === null) {
        setShowWrongPwdMessage(true)
        setPasswordInput('')
      }

      // credential matchs
      else if (res?.error === null && res.url !== null) {
        // toast or some sort of feedback

        router.push(res.url)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      { session ? (
        <div className='my-8 flex flex-col justify-center'>
          <button onClick={() => signOut()} className='
            w-min
            mx-auto
            p-3
            rounded-md
            border
          bg-stone-100
          hover:bg-stone-200
          text-stone-800
            whitespace-nowrap
            font-semibold
          '>Sign out</button>
        </div>
      ) : (
        <form onSubmit={(e) => submitCredential(e)}
          className='my-8 flex flex-col'
        >
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className='my-2 p-2 border rounded-md'
            />
          </div>
          <div className='h-2'>
            { showInvalidPwdMessage && (
              <p className='mt-2 flex gap-2 items-center'>
                <FaTriangleExclamation />
                Invalid password. Please try again.
              </p>
            )}
            { showWrongPwdMessage && (
              <p className='mt-2 flex gap-2 items-center'>
                <FaTriangleExclamation />
                Wrong password. Please try again.
              </p>
            )}
          </div>
          <div className='flex justify-center'>
            <button className='
              w-full
              mt-7
              py-2
              rounded-md
            bg-stone-200
            hover:bg-stone-300
              font-semibold
            '>Submit</button>
          </div>
        </form>
      )}
    </>
  )
}

export default LoginModal