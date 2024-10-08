import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SignOutButton from '@/components/SignOutButton'

const LargeNavBar = () => {
  const { data: session } = useSession({ required: false })

  const [showAdminMenuDropdown, setShowAdminMenuDropdown] = useState(false)

  useEffect(() => {
    let adminMenuDropdownHandler = (e: any) => {
      if (adminMenuDropdownRef.current && !adminMenuDropdownRef.current.contains(e.target)) {
        setShowAdminMenuDropdown(false)
      }
    }
    document.addEventListener('mousedown', adminMenuDropdownHandler)
  }, [])

  const adminMenuDropdownRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Link href='/' className='flex gap-2 items-center'> 
        <Image src='/images/logos/dev-kim-transparent.png' alt='Logo'
          width={500} height={500} className='object-contain w-28 invert'
        />
      </Link>

      <div className='flex gap-10 mt-1'>
        <Link href='/' className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Home </Link>

        <Link href='/projects' className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Projects </Link>

        <Link href='/blog' className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Blog </Link>


        { session && (
          <>
            <div ref={adminMenuDropdownRef} className='relative'>
              <button onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                className='text-stone-100 hover:text-stone-50 hover:underline
              '>
                Admin
              </button>

              { showAdminMenuDropdown && (
                <div className='
                  absolute
                  top-10
                  right-0
                  mt-[0.05rem]
                  bg-stone-700
                '>
                  <ul>
                    <li onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                      className='p-4 hover:bg-stone-500
                    '>
                      <Link href='/admin/blog' className='
                          whitespace-nowrap
                          hover:underline
                          text-stone-100
                          hover:text-stone-100
                      '>Manage Blog</Link>
                    </li>
                    <li onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                      className='p-4 hover:bg-stone-500
                    '>
                      <SignOutButton />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default LargeNavBar