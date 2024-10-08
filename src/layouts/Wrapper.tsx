import SideBar from '@/layouts/SideBar'
import NavBar from '@/layouts/NavBar'
import Footer from '@/layouts/Footer'

type TWrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children } : TWrapperProps) => {
  return (
    <div>
      <NavBar />
      <SideBar />

      <main className='
        w-full min-h-screen mt-16 bg-stone-50
      '>{ children }</main>

      <Footer />
    </div>
  )
}

export default Wrapper