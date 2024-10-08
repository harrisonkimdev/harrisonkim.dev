import { useAppState } from '@/layouts/providers/AppStateContext'

import LargeNavbar from '@/layouts/LargeNavBar'
import SmallNavbar from '@/layouts/SmallNavBar'

const NavBar = () => {
  const { dispatch } = useAppState()

  return (
      <div className='fixed top-0 w-full z-10'>
        <div className='
          hidden
          h-16
          px-6
          py-4
          md:flex
          justify-between
          items-center
        text-stone-200
        bg-black
        '>
         <LargeNavbar />        
        </div>

        <div className={`
          p-4
          grid
          md:hidden
          grid-cols-3
          items-center
          bg-black
          text-stone-200
        `}>
          <SmallNavbar showSideBar={() => dispatch({ type: 'TOGGLE_ON' }) } />
        </div>
      </div>
  )
}

export default NavBar