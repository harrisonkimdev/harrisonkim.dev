'use client'

import React, { useState } from 'react'
import './styles/styles.css'
import MosPic from './components/MosPic'
import Dashboard from './components/Dashboard'
import Threejs from './components/Threejs'

const Page = () => {

  const [filepath, setFilepath] = useState('')

  const buttonStyle = (project: string) => {

  }

  const contentWrapper = () => {
    if (filepath === 'mosPic') return <MosPic />
    else if (filepath === 'Dashboard') return <Dashboard />
    else if (filepath === 'claw_machine') return <Threejs />
  }

  return (
    <section className='bg-stone-50 w-full'>
      <div className='max-w-5xl mx-auto'>
        <div className='py-10'>
          <div className='flex justify-between'>
            <button type='button' onClick={() => {setFilepath('mosPic')}}
              className={`
                ${filepath === 'mosPic' ? 'bg-stone-300' : 'bg-stone-200'}
                w-full py-1 rounded-tl-md
            `}> mosPic </button>

            {/* rounded-tr-md */}
            <button type='button' onClick={() => {setFilepath('Dashboard')}}
              className={`
                ${filepath === 'Dashboard' ? 'bg-stone-300' : 'bg-stone-200'}
                w-full py-1
            `}> Dashboard </button>

            <button type='button' onClick={() => {setFilepath('claw_machine')}}
              className={`
                ${filepath === 'claw_machine' ? 'bg-stone-300' : 'bg-stone-200'}
                w-full py-1 rounded-tr-md
            `}> three.js </button>
          </div>
          <div className='bg-black text-lime-400 px-2 pt-1 pb-20 font-mono rounded-b-md'>
            <p>user@harrisonkim-dev ~ % git clone { filepath }<span className='blink_me'>|</span></p>
            {/* <p>Downloading...</p>
            <p>Installing the program...</p>
            <p>Initializing...</p>
            <p>Hang on tight... Almost ready...</p>
            <p>Happy coding!</p> */}

          </div>
        </div>
        <div className='mt-6'>
          { contentWrapper() }
        </div>
      </div>
    </section>
  )
}

export default Page