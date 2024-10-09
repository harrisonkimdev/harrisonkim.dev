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
        w-full min-h-screen mt-14 md:mt-20 pt-14
        flex flex-col items-center bg-neutral-50 
      '>
        <div className='max-w-3xl'>
          { children }
        </div>
      </main>

      <TopArrow />

      {/* <Footer /> */}
    </div>
  )
}

export default Wrapper