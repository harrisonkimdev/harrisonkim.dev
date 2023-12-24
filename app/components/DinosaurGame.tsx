'use client'

import React, { useEffect } from 'react'

const DinosaurGame = () => {

    useEffect(() => {
        initCanvas()
    }, [])

    const initCanvas = () => {
        const canvas: HTMLElement | null = document.getElementById('canvas')
        var ctx: CanvasRenderingContext2D | null

        var bugImage = new Image()
        bugImage.src = '/images/bug.png'

        var timer = 0
        var bugs: Bug[] = []
        var isJumping = false
        var periodJumping = 0

        var dino = {
            x: 50,
            y: 75,
            width: 50,
            height: 75,
            draw() {
                if (ctx) {
                    ctx.fillStyle = 'green'
                    ctx?.fillRect(this.x, this.y, this.width, this.height)
                }
            },
            jump() {
                this.y -= 3
            },
            fall() {
                this.y += 3
            },
            isOnTheGround() {
                return this.y === 75 ? true : false
            },
            didHitTheCeiling() {
                return this.y === 0 ? true : false
            }
        }

        class Bug {
            private x: number
            private y: number
            private width: number
            private height: number

            constructor() {
                // this.x = window.innerWidth
                this.x = 500
                this.y = 125
                this.width = 25
                this.height = 25
            }
            draw() {
                if (ctx) {
                    // ctx.fillStyle = 'red'
                    // ctx?.fillRect(this.x, this.y, this.width, this.height)
                    ctx?.drawImage(bugImage, this.x, this.y)
                }
            }
            moveForward() {
                this.x--
            }
            isOutOfFrame() {
                return this.x < 0 ? true : false
            }
        }

        const initAnimation = () => {
            requestAnimationFrame(initAnimation)
            
            timer++

            if (canvas instanceof HTMLCanvasElement) {
                ctx?.clearRect(0,0, canvas.width, canvas.height)
            }

            if (timer % (75*2) === 0) {
                var bug = new Bug()
                bugs.push(bug)
            }

            bugs.forEach((bug, i, o) => {
                if (bug.isOutOfFrame())
                    o.splice(i, 1)
                bug.moveForward()
                bug.draw()
            })

            dino.draw()

            if (isJumping === true) {
                if (dino.didHitTheCeiling())
                    isJumping = false
                dino.jump()
            } else {
                if (!dino.isOnTheGround())
                    dino.fall()
            }
        }

        // is this the best practice?
        if (canvas instanceof HTMLCanvasElement) {
            ctx = canvas.getContext('2d')

            if (ctx) {
                canvas.width = window.innerWidth
                canvas.height = 150

                document.addEventListener('keydown', (e: KeyboardEvent) => {
                    if (e.code === 'Space') {
                        isJumping = true
                    }
                })

                initAnimation()
            } else {
                console.error('Failed to get 2D context from canvas.');
            }
        } else {
            console.error('Canvas element not found.');
        }
    }

    return (
        <div className='w-full h-40 flex flex-col'>
            DinosaurGame

            <canvas id="canvas" className='h-[150px] py-4'>

            </canvas>
        </div>
    )
}

export default DinosaurGame