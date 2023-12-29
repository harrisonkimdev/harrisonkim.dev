'use client'

import React,{ useState } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'
import Image from 'next/image'
import { FaBars } from "react-icons/fa6";

const TopNavbar = ({ emitCloseSidebar }: { emitCloseSidebar: Function }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <nav>
      { toggleSidebar ? (
        <div className='absolute top-0 left-0 right-0'>
          <Sidebar
            handleClose={() => {
              setToggleSidebar(false); emitCloseSidebar(false);
            }}
            emitCloseSidebar={() => {
              setToggleSidebar(false); emitCloseSidebar(false);
            }}
          />
        </div>
      ) : (
        <nav className='fixed top-0 w-full z-10'>
          {/* Tablets and Desktops */}
          <div className='
            hidden md:h-[60px]
            px-6 py-4 md:flex justify-between items-center text-stone-200 bg-black
          '>
            <Link href="/" className='flex gap-2 items-center'> 
              <Image src='/images/logos/dev-kim-transparent.png' alt='Logo'
                width={500} height={500} className='object-contain w-28 invert'
              />
            </Link>

            <div className='flex gap-10 mt-1'>
              <Link href="/">
                <p className='
                  text-stone-100 hover:text-stone-50 hover:underline
                '>Home</p>
              </Link>

              <Link href="/projects">
                <p className='
                  text-stone-100 hover:text-stone-50 hover:underline
                '>Projects</p>
              </Link>

              <Link href="/blogs">
                <p className='
                  text-stone-100 hover:text-stone-50 hover:underline
                '>Blogs</p>
              </Link>
            </div>
          </div>
          
          {/* Smartphones */}
          <div className={toggleSidebar ? 'opacity-20' : ''}>
            <div className='
              p-4 grid md:hidden grid-cols-3 items-center bg-black
              text-stone-200
            '>
              <div onClick={() => {
                setToggleSidebar(true); emitCloseSidebar(true);
              }} className='col-span-1'>
                <FaBars className='w-6 h-6'/>
              </div>

              <Link href="/" className='col-span-1 flex justify-center'> 
                <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
                  width={112} height={112} className='object-contain w-28 invert'
                />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </nav>
  )
}

export default TopNavbar