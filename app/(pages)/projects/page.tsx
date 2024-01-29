'use client'

import React, { useState } from 'react'
import '@/globals.css'
import ProjectContent from '@/(pages)/projects/(components)/ProjectContent'
import '@/assets/project_description.json'
import { FaTerminal } from "react-icons/fa6"

const ProjectsPage = () => {
  const [filepath, setFilepath] = useState('')
  const [isContentVisible, setIsContentVisible] = useState(false)

  const projects_json = require('@/assets/project_description.json')

  const contentWrapper = () => {
    if (filepath === 'claw_machine')
      return <ProjectContent project={projects_json.projects[0]} />

    else if (filepath === 'dashboard')
      return <ProjectContent project={projects_json.projects[1]} />

    else if (filepath === 'mosPic')
      return <ProjectContent project={projects_json.projects[2]} />

    else if (filepath === 'dandycv')
      return <ProjectContent project={projects_json.projects[3]} />
  }

  const tabClicked = (projectName: string, showContent: boolean) => {
    setFilepath(projectName)
    setIsContentVisible(showContent)
  }

return (
  <div className='
    max-w-5xl min-h-screen mx-auto p-8 md:p-16
    flex flex-col justify-center
  '>
    {/* terminal window - desktop */}
    <div className={`
      hidden md:block
      ${ isContentVisible ? '' : 'h-full min-w-[44rem] flex flex-col justify-center' }
      ease-in
      duration-300
      motion-reduce:duration-0
    `}>
      {/* toggled off, icon */}
      <div className={`
        ${isContentVisible ?
          'opacity-1 h-16 py-4 flex justify-center'
          : 'hidden'
        }
        ease-in duration-300 motion-reduce:duration-0
      `}>
        <FaTerminal onClick={() => { tabClicked('', false) }}
          className='
            text-2xl cursor-pointer hover:text-4xl
            ease-in duration-300 motion-reduce:duration-0
        '/>
      </div>

      {/* toggled on */}
      <div className={`
        ${isContentVisible ? 'hidden' : 'opacity-1 w-full'}
        ease-in duration-300 motion-reduce:duration-0
      `}>
        {/* a group of project tabs */}
        <div className='flex justify-between'>
          <button onClick={() => { tabClicked('dandycv', true) }}
            className={`
              w-full
              px-12
              py-1
              cursor-pointer
              rounded-tl-md
              whitespace-nowrap
              bg-stone-200
            hover:bg-stone-300
          `}> dandycv </button>

          <button onClick={() => { tabClicked('mosPic', true) }}
            className={`
              w-full
              px-12
              py-1
              cursor-pointer
              whitespace-nowrap
              bg-stone-200
            hover:bg-stone-300
          `}> mosPic </button>

          <button onClick={() => { tabClicked('dashboard', true) }}
            className={`
              w-full
              px-12
              py-1
              cursor-pointer
              witespace-nowrap
              bg-stone-200
              hover:bg-stone-300
          `}> Dashboard </button>

          <button onClick={() => { tabClicked('claw_machine', true) }}
            className={`
              w-full
              px-12
              py-1
              cursor-pointer
              rounded-tr-md
              whitespace-nowrap
              bg-stone-200
            hover:bg-stone-300
          `}> Claw Machine </button>
        </div>

        {/* terminal */}
        <div className='
          h-80 px-2 pt-1 pb-20 rounded-b-md bg-black
          font-mono text-lime-400
        '>
          <p>
            user@harrisonkim-dev ~ % git clone { filepath }
            <span className='blink_me'>|</span>
          </p>
        </div>
      </div>
    </div>

    {/* buttons - mobile */}
    <div className={`
      md:hidden
      ${ isContentVisible ? '' : 'opacity-1 w-full' }
      ease-in duration-300 motion-reduce:duration-0
    `}>
      <div className={`
        ${isContentVisible ?
          'opacity-1 h-16 py-4 flex justify-center'
          : 'hidden'
        }
        ease-in duration-300 motion-reduce:duration-0
      `}>
        <FaTerminal onClick={() => { tabClicked('', false) }}
          className='
            text-2xl active:scale-150
            ease-in duration-300 motion-reduce:duration-0
        '/>
      </div>

      <div className={`
        ${ isContentVisible ? 'hidden' : 'opacity-1 w-full' }
        grid grid-cols-2 gap-4
      `}>
        <button
          onClick={() => { tabClicked('dandycv', true) }}
          className='
            p-6
            rounded-md border
            shadow-md
            text-xl
            whitespace-nowrap
          bg-stone-200
          active:bg-stone-100
        '>dandycv</button>
        <button onClick={() => { tabClicked('mosPic', true) }}
          className='
            p-6
            rounded-md border
            shadow-md
            text-xl
            whitespace-nowrap
          bg-stone-200
          active:bg-stone-100
        '>mosPic</button>
        <button onClick={() => { tabClicked('dashboard', true) }}
          className='
            p-6
            rounded-md border
            shadow-md
            text-xl
            whitespace-nowrap
          bg-stone-200
          active:bg-stone-100
        '>Dashboard</button>
        <button onClick={() => { tabClicked('claw_machine', true) }}
          className='
            p-6
            rounded-md border
            shadow-md
            text-xl
            whitespace-nowrap
          bg-stone-200
          active:bg-stone-100
        '>Claw Machine</button>
      </div>
    </div>

    {/* Project Description */}
    <div className={`
      ${isContentVisible ? 'opacity-1 py-6' : 'opacity-0'}
      ease-in duration-300 motion-reduce:duration-0
    `}>{ contentWrapper() }</div>
  </div>
  )
}

export default ProjectsPage