'use client'

import React, { useEffect } from 'react'

const DinosaurGame = () => {

    useEffect(() => {
        initCanvas()
    }, [])

    const initCanvas = () => {
        const canvas: HTMLElement | null = document.getElementById('canvas')
        var ctx: CanvasRenderingContext2D | null

        // bug & person image
        var bugImage = new Image()
        bugImage.src = '/images/bug.png'
        var personImage = new Image()
        personImage.src = '/images/running-person.png'
        var zeroImage = new Image()
        zeroImage.src = '/images/zero.png'
        var oneImage = new Image()
        oneImage.src = '/images/one.png'

        var timer = 0
        var bugs: Bug[] = []
        var numbers: Number[] = []
        var isJumping = false
        var score = 0

        // 
        var player = {
            x: 50,
            y: 75,
            width: 65,
            height: 75,
            draw() {
                if (ctx) {
                    ctx.fillStyle = 'green'
                    ctx?.fillRect(this.x, this.y, this.width, this.height)
                    ctx.drawImage(personImage, this.x, this.y, this.width, this.height)
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

        // BackgroundImages
        // TODO: consider implementing it with Interface
        class Number {
            private x: number
            private y: number
            private width: number
            private height: number

            constructor() {
                this.x = window.innerWidth
                this.y = Math.floor(Math.random() * 75)
                this.width = 25
                this.height = 25
            }
            draw() {
                var zeroOrOne = Math.floor(Math.random() * 2)

                if (ctx) {
                    ctx.fillStyle = 'yellow'
                    ctx?.fillRect(this.x, this.y, this.width, this.height)
                    if (zeroOrOne === 0)
                        ctx?.drawImage(zeroImage, this.x, this.y, this.width, this.height)
                    else
                        ctx?.drawImage(oneImage, this.x, this.y, this.width, this.height)
                }
            }
            moveForward() {
                this.x -= (5 + Math.floor(Math.random()*4))
            }
            isOutOfFrame() {
                return this.x < 0 ? true : false
            }
        }

        class Bug {
            private x: number
            private y: number
            private width: number
            private height: number

            constructor() {
                this.x = window.innerWidth
                this.y = 125
                this.width = 25
                this.height = 25
            }
            draw() {
                if (ctx) {
                    ctx.fillStyle = 'red'
                    ctx?.fillRect(this.x, this.y, this.width, this.height)
                    ctx?.drawImage(bugImage, this.x, this.y, this.width, this.height)
                }
            }
            moveForward() {
                this.x -= 3 + Math.floor(Math.random()*1)
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

            // object generators
            // bugs
            if (timer % (75*(2 + Math.floor(Math.random()*3))) === 0) {
                var bug = new Bug()
                bugs.push(bug)
            }
            // numbers
            if (timer % (25 + Math.floor(Math.random()*5)) === 0) {
                var number = new Number()
                numbers.push(number)
            }

            // object dispatcher
            // bugs
            bugs.forEach((bug, i, o) => {
                if (bug.isOutOfFrame())
                    o.splice(i, 1)
                bug.moveForward()
                bug.draw()
            })
            // numbers
            numbers.forEach((number, i, o) => {
                if (number.isOutOfFrame())
                    o.splice(i, 1)
                number.moveForward()
                number.draw()
            })

            player.draw()

            // jump action
            if (isJumping === true) {
                if (player.didHitTheCeiling())
                    isJumping = false
                player.jump()
            } else {
                if (!player.isOnTheGround())
                    player.fall()
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