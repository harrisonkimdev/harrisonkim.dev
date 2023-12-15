'use client'

import React, { useState } from 'react'
import '@/globals.css'
import ProjectContent from '@/components/ProjectContent'
import '@/assets/project_description.json'
import { FaTerminal } from "react-icons/fa6"
import { isJSDocNameReference } from 'typescript'

const Page = () => {
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
    <div className='bg-stone-50 w-full px-4'>
        <div className='max-w-5xl mx-auto py-12 h-full'>
            {/* terminal window */}
            <div className={`
                ease-in duration-300
                ${isContentVisible ? '' : 'h-full flex flex-col justify-center'}
            `}>

                {/* toggled off, icon */}
                <div className={`
                    ${isContentVisible ?
                        'opacity-1 h-16 py-4 flex justify-center ease-in duration-300'
                        : 'hidden'
                    }
                `}>
                    <FaTerminal onClick={() => { tabClicked('', false) }}
                        className='text-2xl cursor-pointer hover:text-4xl ease-in duration-300'
                    />
                </div>

                {/* toggled on */}
                <div className={`w-full ease-in duration-300
                    ${isContentVisible ? 'opacity-0 h-0' : 'opacity-1'} 
                `}>
                    {/* a group of tabs for projects */}
                    <div className='flex justify-between'>
                        <button type='button' onClick={() => { tabClicked('dandycv', true) }}
                            className={`
                            ${filepath === 'dandycv' ? 'bg-stone-300' : 'bg-stone-200'}
                            w-full
                            py-1
                            cursor-pointer
                            rounded-tl-md
                            hover:bg-stone-300
                        `}> dandycv </button>

                        <button type='button' onClick={() => { tabClicked('mosPic', true) }}
                            className={`
                            ${filepath === 'mosPic' ? 'bg-stone-300' : 'bg-stone-200'}
                            w-full
                            py-1
                            cursor-pointer
                            hover:bg-stone-300
                        `}> mosPic </button>

                        {/* rounded-tr-md */}
                        <button type='button' onClick={() => { tabClicked('dashboard', true) }}
                            className={`
                            ${filepath === 'Dashboard' ? 'bg-stone-300' : 'bg-stone-200'}
                            w-full
                            py-1
                            cursor-pointer
                            hover:bg-stone-300
                        `}> Dashboard </button>

                        <button type='button' onClick={() => { tabClicked('claw_machine', true) }}
                            className={`
                            ${filepath === 'claw_machine' ? 'bg-stone-300' : 'bg-stone-200'}
                            w-full
                            py-1
                            cursor-pointer
                            rounded-tr-md
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
                    {/* <p>Downloading...</p>
                    <p>Installing the program...</p>
                    <p>Initializing...</p>
                    <p>Hang on tight... Almost ready...</p>
                    <p>Happy coding!</p> */}

                    </div>
                </div>
            </div>

            {/* Project Description */}
            <div className={`
                py-6 ${isContentVisible ? 'opacity-1' : 'opacity-0'}
                ease-in duration-300
            `}>{ contentWrapper() }</div>
        </div>
    </div>
    )
}

export default Page