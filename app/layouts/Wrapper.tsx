'use client'

import React from 'react'
import { useAppState } from '@/layouts/providers/AppStateContext'

import SideBar from '@/layouts/SideBar'
import NavBar from '@/layouts/NavBar'
import Footer from '@/layouts/Footer'

const Wrapper = ({
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
            <SideBar
              closeSidebar={() => dispatch({ type: 'TOGGLE_OFF' }) }
            />
          </div>
        </>
      ) : (
        <div className='flex flex-col'>
          <nav>
            <NavBar />
          </nav>

          <main className='w-full min-h-screen mt-16 bg-stone-50'>
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

export default Wrapper