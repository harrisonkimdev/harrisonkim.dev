'use client'

import { useAppState } from '@/layouts/providers/AppStateContext'
import SideBar from '@/layouts/SideBar'
import NavBar from '@/layouts/NavBar'
import Footer from '@/layouts/Footer'

type TWrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children } : TWrapperProps) => {
  const { state, dispatch } = useAppState()
  
  return (
    <>
      { state.showSideBar ? (
        <SideBar
          closeSidebar={() => dispatch({ type: 'TOGGLE_OFF' }) }
        />
      ) : (
        <div className='flex flex-col'>
          <NavBar />

          <main className='w-full min-h-screen mt-16 bg-stone-50'>
            { children }
          </main>

          <Footer />
        </div>
      ) }
    </>
  )
}

export default Wrapper