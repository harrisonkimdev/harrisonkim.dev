'use client'

import React, { useState } from 'react'
import './styles/styles.css'
import ProjectContent from './components/ProjectContent'
import '@/assets/project_description.json'

const Page = () => {
  const [filepath, setFilepath] = useState('')

  const projects_json = require('@/assets/project_description.json')

  const contentWrapper = () => {
    if (filepath === 'claw_machine')
      return <ProjectContent project={projects_json.projects[0]} />

    else if (filepath === 'Dashboard')
      return <ProjectContent project={projects_json.projects[1]} />

    else if (filepath === 'mosPic')
      return <ProjectContent project={projects_json.projects[2]} />
    
    else if (filepath === 'dandycv')
      return <ProjectContent project={projects_json.projects[3]} />
  }

  return (
    <>
      <div className='bg-stone-50 w-full px-4'>
        <div className='max-w-5xl mx-auto'>
          <div className='py-10'>
            <div className='flex justify-between'>
              <button type='button' onClick={() => {setFilepath('dandycv')}}
                className={`
                  ${filepath === 'dandycv' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full
                  py-1
                  cursor-pointer
                  rounded-tl-md
                hover:bg-stone-300
              `}> dandycv </button>

              <button type='button' onClick={() => {setFilepath('mosPic')}}
                className={`
                  ${filepath === 'mosPic' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full
                  py-1
                  cursor-pointer
                hover:bg-stone-300
              `}> mosPic </button>

              {/* rounded-tr-md */}
              <button type='button' onClick={() => {setFilepath('Dashboard')}}
                className={`
                  ${filepath === 'Dashboard' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full
                  py-1
                  cursor-pointer
                hover:bg-stone-300
              `}> Dashboard </button>

              <button type='button' onClick={() => {setFilepath('claw_machine')}}
                className={`
                  ${filepath === 'claw_machine' ? 'bg-stone-300' : 'bg-stone-200'}
                  w-full
                  py-1
                  cursor-pointer
                  rounded-tr-md
                hover:bg-stone-300
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