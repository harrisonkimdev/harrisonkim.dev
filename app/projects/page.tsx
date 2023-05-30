'use client'

import React, { useState } from 'react'
import './styles/styles.css'
import ProjectContent from './components/ProjectContent'

const Page = () => {
  const [filepath, setFilepath] = useState('')

  const projects = [
    {
      name: 'mosPic',
      readme: '*** This is a team project working with 5 individuals. ***',
      screenshots: [
        {
          id: 1,
          src: '/images/screenshots/mosPic/landing-page.png',
          description: 'landing page'
        },
        {
          id: 2,
          src: '/images/screenshots/mosPic/gallery-page.png',
          description: 'gallery page'
        },
        {
          id: 3,
          src: '/images/screenshots/mosPic/background-image-page.png',
          description: 'background image'
        },
      ]
    },
    {
      name: 'Dashboard',
      readme: '',
      screenshots: [
        {
          id: 4,
          src: '/images/screenshots/Dashboard/task-management.png',
          description: 'Task Management on GitHub'
        },
        {
          id: 5,
          src: '/images/screenshots/Dashboard/task-description.png',
          description: 'Task Description'
        },
        {
          id: 6,
          src: '/images/screenshots/Dashboard/blocksix.png',
          description: 'BlockSix - Todo'
        },
        {
          id: 7,
          src: '/images/screenshots/Dashboard/notes.png',
          description: 'Notes'
        },
      ]
    },
    {
      name: 'Claw Machine',
      readme: '',
      screenshots: [
        {
          id: 8,
          src: '/images/screenshots/claw-machine/full.png',
          description: ''
        },
        {
          id: 9,
          src: '/images/screenshots/claw-machine/close.png',
          description: ''
        },
        {
          id: 10,
          src: '/images/screenshots/claw-machine/grab.png',
          description: ''
        },
      ]
    },
  ]

  const contentWrapper = () => {
    if (filepath === 'mosPic')
      return <ProjectContent project={projects[0]} />

    else if (filepath === 'Dashboard')
      return <ProjectContent project={projects[1]} />
    
    else if (filepath === 'claw_machine')
      return <ProjectContent project={projects[2]} />
  }

  return (
    <>
      <div className='bg-stone-50 w-full px-4'>
        <div className='max-w-5xl mx-auto'>
          <div className='py-10'>
            <div className='flex justify-between'>
              <button type='button' onClick={() => {setFilepath('mosPic')}}
                className={`
                  ${filepath === 'mosPic' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full py-1 hover:bg-stone-300 cursor-pointer rounded-tl-md 
              `}> mosPic </button>

              {/* rounded-tr-md */}
              <button type='button' onClick={() => {setFilepath('Dashboard')}}
                className={`
                  ${filepath === 'Dashboard' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full py-1 hover:bg-stone-300 cursor-pointer 
              `}> Dashboard </button>

              <button type='button' onClick={() => {setFilepath('claw_machine')}}
                className={`
                  ${filepath === 'claw_machine' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full py-1 hover:bg-stone-300 cursor-pointer rounded-tr-md 
              `}> Claw Machine </button>
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
          <div className='py-6'>
            { contentWrapper() }
          </div>
        </div>
      </div>
    </>
  )
}

export default Page