import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

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

describe('Home 페이지', () => {
  it('헤더 텍스트가 렌더링되어야 함', () => {
    render(<Home />)
    
    const heading = screen.getByText(/Hello, World!/i)
    
    expect(heading).toBeInTheDocument()
  })
  
  it('소개 텍스트가 렌더링되어야 함', () => {
    render(<Home />)
    
    const introText = screen.getByText(/I'm Harrison Kim/i)
    
    expect(introText).toBeInTheDocument()
  })
  
  it('소셜 링크들이 렌더링되어야 함', () => {
    render(<Home />)
    
    const linkedInLink = screen.getByText('LinkedIn')
    const githubLink = screen.getByText('GitHub')
    const resumeLink = screen.getByText('Resumé')
    const emailLink = screen.getByText('Email')
    const chatLink = screen.getByText("Let's Chat")
    
    expect(linkedInLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(resumeLink).toBeInTheDocument()
    expect(emailLink).toBeInTheDocument()
    expect(chatLink).toBeInTheDocument()
  })
  
  it('터미널 섹션이 렌더링되어야 함', () => {
    render(<Home />)
    
    const terminalSectionTitle = screen.getByText('About Me')
    const terminalSection = screen.getByTestId('terminal-section-mock')
    
    expect(terminalSectionTitle).toBeInTheDocument()
    expect(terminalSection).toBeInTheDocument()
  })
  
  it('공룡 게임 섹션이 렌더링되어야 함', () => {
    render(<Home />)
    
    const gameTitle = screen.getByText('Take a Break')
    const dinosaurGame = screen.getByTestId('dinosaur-game-mock')
    
    expect(gameTitle).toBeInTheDocument()
    expect(dinosaurGame).toBeInTheDocument()
  })
}) 