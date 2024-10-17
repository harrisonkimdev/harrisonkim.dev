"use client"

import { useAppState } from '@/layouts/providers/AppStateContext'
import NavBar from "@/layouts/NavBar"
import SideBar from '@/layouts/SideBar'
import TopArrow from "@/components/TopArrow"
// import Footer from "@/layouts/Footer"

type TWrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children } : TWrapperProps) => {
  const { state } = useAppState()
  
  return (
    <div>
      { state.showSideBar ? (
        <SideBar />
      ) : (
        <>
          <NavBar />

          <main className="flex justify-center min-h-screen">
            <div className="max-w-5xl mt-14 md:mt-20 p-6">
              { children }
            </div>
          </main>

          <TopArrow />

          {/* <Footer /> */}
        </>
      )}
    </div>
  )
}

export default Wrapper