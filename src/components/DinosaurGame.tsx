'use client'

import { useReducer, useEffect } from 'react'

// Constants
const INSTRUCTION = 'Hit the space bar to jump!'
const GO = 'Go!!!'

// Types
type GameState = {
  startGame: boolean
  isReady: boolean
  prompt: string
  count: number
}

type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'SET_COUNT', payload: number }
  | { type: 'DECREMENT_COUNT' }
  | { type: 'SET_PROMPT', payload: string }
  | { type: 'SET_READY' }

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, startGame: true }
    case 'SET_COUNT':
      return { ...state, count: action.payload }
    case 'DECREMENT_COUNT':
      return { ...state, count: state.count - 1 }
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload }
    case 'SET_READY':
      return { ...state, isReady: true }
    default:
      return state
  }
}

// Separate component for the Canvas
const DinosaurCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('dinosaur-canvas') as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Draw a simple dino character
        ctx.fillStyle = '#22c55e'
        ctx.fillRect(50, 100, 20, 40)
        ctx.fillRect(70, 110, 30, 10)
        ctx.fillRect(50, 130, 10, 20)
        ctx.fillRect(70, 130, 10, 20)
      }
    }
  }, [])

  return (
    <>
      <canvas id='dinosaur-canvas' width='600' height='150' className='border border-gray-700 bg-black'></canvas>
      <p className='mt-3 text-sm text-gray-400'>
        Note: This is a simplified placeholder. In the full version, this would be a playable game.
      </p>
    </>
  )
}

// Game starting button
const StartButton = ({ onStart }: { onStart: () => void }) => (
  <button 
    onClick={onStart} 
    className='px-6 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-black text-2xl transition-all duration-200'
  >
    Game Start
  </button>
)

// Prompt display
const PromptDisplay = ({ text }: { text: string }) => (
  <span className='text-2xl text-primary font-mono'>{text}</span>
)

const DinosaurGame = () => {
  // Initial state
  const initialState: GameState = {
    startGame: false,
    isReady: false,
    prompt: '',
    count: -1
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { startGame, isReady, prompt, count } = state

  useEffect(() => {
    if (startGame) {
      dispatch({ type: 'SET_PROMPT', payload: INSTRUCTION })
  
      const instructionTimeout = setTimeout(() => {
        dispatch({ type: 'SET_COUNT', payload: 3 })
      }, 2000)

      return () => {
        clearTimeout(instructionTimeout)
      }
    }
  }, [startGame])
  
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout

    if (count !== -1) {
      dispatch({ type: 'SET_PROMPT', payload: `${count}` })
  
      countdownInterval = setInterval(() => {
        dispatch({ type: 'DECREMENT_COUNT' })
      }, 1000)
  
      if (count === 0) {
        clearInterval(countdownInterval)
        dispatch({ type: 'SET_PROMPT', payload: GO })
        setTimeout(() => {
          dispatch({ type: 'SET_READY' })
        }, 1500)
      }
    }

    return () => {
      clearInterval(countdownInterval)
    }
  }, [count])

  const renderGameContent = () => {
    if (!startGame) {
      return <StartButton onStart={() => dispatch({ type: 'START_GAME' })} />
    } else if (startGame && !isReady) {
      return <PromptDisplay text={prompt} />
    } else if (startGame && isReady) {
      return <DinosaurCanvas />
    }
    return null
  }

  return (
    <div className='w-full h-40 flex flex-col items-center justify-center'>
      {renderGameContent()}
    </div>
  )
}

export default DinosaurGame