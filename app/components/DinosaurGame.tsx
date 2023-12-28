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
}

export default DinosaurGame