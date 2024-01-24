'use client'

import React from 'react'
import { useAppState } from '@/components/AppStateContext'

import SideBar from '@/layouts/SideBarCaseSensitive'
import NavBar from '@/layouts/NavBarCaseSensitive'
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

export default Wrapper