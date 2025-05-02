import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import TerminalSection from '@/components/home/TerminalSection'

// framer-motion 모킹
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('TerminalSection 컴포넌트', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('터미널 헤더가 렌더링되어야 함', () => {
    render(<TerminalSection />)
    
    const terminalHeader = screen.getByText('terminal — harrison@dev')
    
    expect(terminalHeader).toBeInTheDocument()
  })
  
  it('터미널 컴포넌트가 렌더링되어야 함', () => {
    render(<TerminalSection />)
    
    const terminalWindow = screen.getByTestId('terminal-window') || screen.getByRole('region')
    
    expect(terminalWindow).toBeInTheDocument()
  })
}) 