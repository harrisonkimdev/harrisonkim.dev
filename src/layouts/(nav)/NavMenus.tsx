"use client"

import { useAppState } from '@/layouts/providers/AppStateContext'
import NavBar from "@/layouts/(nav)/NavBar"
import SideBar from '@/layouts/(nav)/SideBar'

const NavMenus = () => {
  const { state, dispatch } = useAppState()

  return (
    <>
      { state.showSideBar ? (
        <SideBar />
      ) : (
        <NavBar />
      )}
    </>
  )
}

export default NavMenus