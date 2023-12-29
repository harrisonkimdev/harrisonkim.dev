'use client'

import React from 'react'
import { FaAngleUp } from "react-icons/fa6";

const Main = ({ children }: any) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // This will create a smooth scrolling effect
        })
    }

    return (
        <div className="relative overflow-hidden pt-[52.5px]">
            <div className={`   
                min-h-[calc(100vh-(60px+76px))] flex flex-grow
                md:min-h-[calc(100vh-(60px+172px))]
            `}>
                { children }
            </div>

            <button type="button" onClick={() => scrollToTop()}
                className='
                fixed bottom-0 right-0 mb-8 mr-20 p-2
                rounded-xl border-2 border-stone-800 bg-stone-200 hover:bg-stone-100
            '>
                <FaAngleUp />
            </button>
        </div>
    )
}

export default Main