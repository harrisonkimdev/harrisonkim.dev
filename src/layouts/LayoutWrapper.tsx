import NavBar from '@/layouts/NavBar'
import Footer from '@/layouts/Footer'

type TWrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children } : TWrapperProps) => {
  return (
    <div>
      <NavBar />
      
      <main className='
        w-full min-h-screen bg-stone-50
      '>{ children }</main>

      <Footer />
    </div>
  )
}

export default Wrapper