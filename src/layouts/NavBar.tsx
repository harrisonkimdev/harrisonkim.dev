import LargeNavbar from '@/layouts/LargeNavBar'
import SmallNavbar from '@/layouts/SmallNavBar'

const NavBar = () => {
  return (
      <nav className='fixed top-0 w-full'>
        <div className='
          hidden md:flex justify-between items-center
          h-16 px-6 py-4 text-stone-200 bg-white
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