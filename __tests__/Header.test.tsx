import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'

// usePathname 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('Header 컴포넌트', () => {
  it('로고 텍스트가 보여야 함', () => {
    render(<Header />)
    
    const logoText = screen.getByText('harrisonkim.dev')
    
    expect(logoText).toBeInTheDocument()
  })
  
  it('네비게이션 링크가 보여야 함', () => {
    render(<Header />)
    
    const projectsLink = screen.getByText('Projects')
    const blogLink = screen.getByText('Blog')
    const contactLink = screen.getByText('Contact')
    
    expect(projectsLink).toBeInTheDocument()
    expect(blogLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
  })
}) 