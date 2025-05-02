import { render } from '@testing-library/react'

// 의존성 모킹
jest.mock('@/components/home/TerminalSection', () => {
  return function MockTerminalSection() {
    return <div data-testid="terminal-section-mock">Terminal Section Mock</div>
  }
})

jest.mock('@/components/DinosaurGame', () => {
  return function MockDinosaurGame() {
    return <div data-testid="dinosaur-game-mock">Dinosaur Game Mock</div>
  }
})

// framer-motion의 motion 요소가 일반 HTML 요소로 변환되도록 모킹
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  }
}))

// usePathname 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

// 테스트할 컴포넌트 import
import Header from '@/components/layout/Header'
import DinosaurGame from '@/components/DinosaurGame'
import Home from '@/app/page'

describe('스냅샷 테스트', () => {
  it('Header 컴포넌트가 스냅샷과 일치해야 함', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })
  
  it('DinosaurGame 컴포넌트가 스냅샷과 일치해야 함', () => {
    const { container } = render(<DinosaurGame />)
    expect(container).toMatchSnapshot()
  })
  
  it('Home 페이지가 스냅샷과 일치해야 함', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
}) 