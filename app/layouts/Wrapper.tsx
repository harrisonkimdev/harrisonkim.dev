'use client'

import React from 'react'
import { useAppState } from '@/components/AppStateContext'
import Sidebar from '@/layouts/SideBar'

import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'

const MainWrapper = ({
  children
} : {
  children: React.ReactNode
}) => {
  const { state, dispatch } = useAppState()
  
  return (
    <>
      { state.showSideBar ? (
        <>
          <div className='absolute top-0 left-0 right-0'>
            <Sidebar
              closeSidebar={() => dispatch({ type: 'TOGGLE_OFF' }) }
            />
          </div>
        </>
      ) : (
        <div className='flex flex-col'>
          <nav>
            <Navbar />
          </nav>

          <main className='mt-8 flex-grow'>
            { children }
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      ) }
    </>
  )
}

export default MainWrapper