import NavBar from '@/layouts/NavBar'
import TopArrow from '@/components/TopArrow'
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

      <TopArrow />

      {/* <Footer /> */}
    </div>
  )
}

export default Wrapper