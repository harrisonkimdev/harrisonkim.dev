import Player from "./classes/Player"
import BackgroundNumber from "./classes/BackgroundNumber"
import Bug from "./classes/Bug"

var canvas: HTMLElement | null
var ctx: CanvasRenderingContext2D | null

var animation: number
var timer = 0
var score = 0

var player: Player
var isJumping = false

var bugs: Bug[] = []
var bgNumbers: BackgroundNumber[] = []

const initAnimation = () => {

    animation = requestAnimationFrame(initAnimation)
    
    timer++

    if (canvas instanceof HTMLCanvasElement) {
        ctx?.clearRect(0,0, canvas.width, canvas.height)
    }

    if (ctx) {
        // Set the font and text properties
        ctx.font = '30px Arial'; // Set the font size and type
        ctx.fillStyle = '#57534e'; // Set the fill color
        
        ctx.fillText("Timer: " + (timer/75).toFixed(1).toString(), window.innerWidth*4/6, 25);
        ctx.fillText("Score: " + (score).toString(), window.innerWidth*5/6, 25);
    }

    // object generators
    // bugs
    if (timer % (75*(2 + Math.floor(Math.random()*3))) === 0) {
        var bug = new Bug()
        bugs.push(bug)
    }
    // numbers
    if (timer % (25 + Math.floor(Math.random()*5)) === 0) {
        var bgNumber = new BackgroundNumber()
        bgNumbers.push(bgNumber)
    }

    // object dispatcher
    if (ctx) player.draw(ctx)

    // bugs
    bugs.forEach((bug, i, o) => {
        if (bug.isOutOfFrame())
            o.splice(i, 1)
        bug.moveForward()
        if (ctx) bug.draw(ctx)

        checkCollision(player.getContactPoints(), bug.getContactPoints())
    })

    // numbers
    bgNumbers.forEach((bgNumber, i, o) => {
        if (bgNumber.isOutOfFrame())
            o.splice(i, 1)
        bgNumber.moveForward()
        if (ctx) bgNumber.draw(ctx)
    })

    // jump action
    if (isJumping === true) {
        player.jump()

        setTimeout(() => {
            player.fall()
            isJumping = false
        }, 370);
    }
}

const checkCollision = (player: number[], bug: number[]) => {
    let xContacted: boolean = player[0] < bug[0] && bug[0] < player[1]
    let yContacted: boolean = player[3] == bug[2]

    if (xContacted && yContacted) {
        score++

        var audio: HTMLElement | null = document.getElementById("dead_bug_sound_effect")
        if (audio instanceof HTMLAudioElement) {
            audio?.play()
        }

        // if (canvas instanceof HTMLCanvasElement) {
        //     ctx?.clearRect(0,0, canvas.width, canvas.height)
        // }
        // cancelAnimationFrame(animation)
    }
}

const playAudio = () => {
    var audio: HTMLElement | null = document.getElementById("jump_sound_effect")
    if (audio instanceof HTMLAudioElement) {
        audio?.play()
    }
}

const initCanvas = () => {
    canvas = document.getElementById('canvas')

    if (canvas instanceof HTMLCanvasElement) {
        ctx = canvas.getContext('2d')

        if (ctx) {
            canvas.width = window.innerWidth
            canvas.height = 150

            player = new Player()

            document.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.code === 'Space') {
                    isJumping = true
                    playAudio()
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

export default initCanvas