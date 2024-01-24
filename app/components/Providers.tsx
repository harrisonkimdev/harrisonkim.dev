'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AppStateProvider } from '@/components/AppStateContext'

const Providers = ({
  children
} : {
  children: React.ReactNode
}) => {
  return (
    <SessionProvider>
      <AppStateProvider>
        { children }
      </AppStateProvider>
    </SessionProvider>
  )
}

export default Providers