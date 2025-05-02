'use client'

import { useState, useEffect } from 'react'

const DinosaurGame = () => {
  const INSTRUCTION = 'Hit the space bar to jump!'
  const GO = 'Go!!!'

  const [startGame, setStartGame] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>('')
  const [count, setCount] = useState<number>(-1)

  useEffect(() => {
    if (startGame) {
      setPrompt(INSTRUCTION)
  
      const instructionTimeout = setTimeout(() => {
        setCount(3)
      }, 2000)

      return () => {
        clearTimeout(instructionTimeout)
      }
    }
  }, [startGame])
  
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout

    if (count !== -1) {
      setPrompt(`${count}`)
  
      countdownInterval = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000)
  
      if (count === 0) {
        clearInterval(countdownInterval)
        setPrompt(GO)
        setTimeout(() => {
          setIsReady(true)
        }, 1500)
      }
    }

    return () => {
      clearInterval(countdownInterval)
    }
  }, [count])

  useEffect(() => {
    if (isReady) {
      // We'll use a simplified version that doesn't rely on an external script
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
    }
  }, [isReady])

  if (!startGame) return (
    <div className='w-full h-40 flex justify-center items-center'>
      <button 
        onClick={() => setStartGame(true)} 
        className='px-6 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-black text-2xl transition-all duration-200'
      >
        Game Start
      </button>
    </div>
  )

  else if (startGame && !isReady) return (
    <div className='w-full h-40 flex justify-center items-center'>
      <span className='text-2xl text-primary font-mono'>{ prompt }</span>
    </div>
  )

  else if (startGame && isReady) return (
    <div className='w-full flex flex-col items-center'>
      <canvas id='dinosaur-canvas' width='600' height='150' className='border border-gray-700 bg-black'></canvas>
      <p className='mt-3 text-sm text-gray-400'>
        Note: This is a simplified placeholder. In the full version, this would be a playable game.
      </p>
    </div>
  )

  else return (<></>)
}

export default DinosaurGame