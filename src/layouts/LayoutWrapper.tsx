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

          <main className="
            flex flex-col items-center w-full min-h-screen bg-black
          ">
            <div className="max-w-5xl mt-14 md:mt-20 pt-14 px-6">
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