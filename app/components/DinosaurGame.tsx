'use client'

import React, { useState, useEffect } from 'react'
import initCanvas from '@/scripts/dinosaurGame'
import { start } from 'repl'
import { after } from 'node:test'

const DinosaurGame = () => {
  const INSTRUCTION = "Hit the space bar to jump!"
  const GO = "Go!!!"

  const [startGame, setStartGame] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>("")
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
    var countdownInterval: any

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
    if (isReady) initCanvas()
  }, [isReady])

  if (!startGame) return (
    <div className='w-full h-40 flex justify-center items-center'>
      <button onClick={() => setStartGame(true)} className='
        h-min
        p-3
        rounded-xl
        border-2
        border-stone-800
        text-2xl
        hover:scale-125
        hover:bg-stone-100
        ease-in
        duration-200
      '>Game Start</button>
    </div>
  )

  else if (startGame && !isReady) return (
    <div className='w-full h-40 flex justify-center items-center'>
      <span className='text-2xl'>{ prompt }</span>
    </div>
  )

  else if (startGame && isReady) return (
    <div className='w-full h-40 flex flex-col'>
      <canvas id="canvas" className='h-[150px] py-4'></canvas>
      <audio id="jump_sound_effect">
        <source src="/sound-effects/jump.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="dead_bug_sound_effect">
        <source src="/sound-effects/dead_bug.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )

  else return (<></>)
}

export default DinosaurGame