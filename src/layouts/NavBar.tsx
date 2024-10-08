import LargeNavbar from '@/layouts/LargeNavBar'
import SmallNavbar from '@/layouts/SmallNavBar'

const NavBar = () => {
  return (
      <nav className='fixed top-0 w-full z-10'>
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

        <div className='
          hidden grid-cols-3 items-center
          p-4 bg-black text-stone-200
        '>
          <SmallNavbar />
        </div>
      </nav>
  )
}

export default NavBar