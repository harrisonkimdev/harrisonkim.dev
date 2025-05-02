import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// 프로바이더들을 여기에 추가
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>{children}</>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

// 모든 testing-library 함수들을 re-export 
export * from '@testing-library/react'
export { customRender as render } 