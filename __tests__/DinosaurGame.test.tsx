import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import DinosaurGame from '@/components/DinosaurGame'

describe('DinosaurGame 컴포넌트', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('초기에는 게임 시작 버튼이 보여야 함', () => {
    render(<DinosaurGame />)
    
    const startButton = screen.getByText('Game Start')
    
    expect(startButton).toBeInTheDocument()
  })
  
  it('게임 시작 버튼 클릭 시 안내 메시지가 보여야 함', () => {
    render(<DinosaurGame />)
    
    const startButton = screen.getByText('Game Start')
    fireEvent.click(startButton)
    
    // useEffect가 실행되도록 타이머 진행
    jest.advanceTimersByTime(100)
    
    // 첫 번째 안내 메시지
    const instruction = screen.getByText('Hit the space bar to jump!')
    
    expect(instruction).toBeInTheDocument()
  })
}) 