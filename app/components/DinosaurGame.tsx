'use client'

import React, { useEffect } from 'react'
import initCanvas from '@/scripts/dinosaurGame'

const DinosaurGame = () => {

    useEffect(() => {
        initCanvas()
    }, [])

    return (
        <div className='w-full h-40 flex flex-col'>
            <canvas id="canvas" className='h-[150px] py-4'></canvas>
            <audio id="myAudio">
                <source src="/sound-effects/bboop.wav" type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default DinosaurGame