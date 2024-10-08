
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FaRegTimesCircle } from 'react-icons/fa'

type TSidebarProps = {
  closeSidebar: Function
}

// Only visible on devices with smaller screen
const SideBar = ({ closeSidebar } : TSidebarProps) => {
  const { data: session } = useSession({ required: false })

  return (
    <div className='
      min-h-screen flex flex-col gap-6 bg-stone-100
    '>
      {/* close icon */}
      <div onClick={() => closeSidebar()} className='m-5 flex justify-end'>
        <FaRegTimesCircle className='w-6 h-6 text-stone-600' />
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-8 pl-12'>
        <Link href='/' onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Home</p>
        </Link>
      
        <Link href='/projects' onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Projects</p>
        </Link>
      
        <Link href='/blog' onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Blog</p>
        </Link>

        { session && (
          <>
            <Link href='/admin/blog' onClick={() => closeSidebar()}>
              <p className='
                text-3xl font-medium text-stone-500 hover:text-stone-600
              '>Manage Blog</p>
            </Link>

            {/* TODO: replace this code with the component. */}
            <button onClick={() => signOut()}>
              <p className='
                cursor-pointer text-left text-3xl font-semibold text-stone-500 hover:text-stone-600
              '>Sign out</p>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SideBar