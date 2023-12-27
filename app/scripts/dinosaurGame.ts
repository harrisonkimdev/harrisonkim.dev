import Player from "./classes/Player"
import BackgroundNumber from "./classes/BackgroundNumber"
import Bug from "./classes/Bug"

const initCanvas = () => {
    const canvas: HTMLElement | null = document.getElementById('canvas')
    var ctx: CanvasRenderingContext2D | null

    var animation: number;
    var timer = 0
    var score = 0
    var bugs: Bug[] = []
    var numbers: BackgroundNumber[] = []
    var isJumping = false

    var player = new Player()

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
            var number = new BackgroundNumber()
            numbers.push(number)
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
        numbers.forEach((number, i, o) => {
            if (number.isOutOfFrame())
                o.splice(i, 1)
            number.moveForward()
            if (ctx) number.draw(ctx)
        })

        // jump action
        if (isJumping === true) {
            player.jump()

            setTimeout(() => {
                player.fall()
                isJumping = false
            }, 300);
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

const checkCollision = (player: number[], bug: number[]) => {
    let xContacted = player[0] < bug[0] && bug[0] < player[1]
    let yContacted = bug[0] < player[3]

    if (xContacted && yContacted) {
        console.log('contacted')

        // if (canvas instanceof HTMLCanvasElement) {
        //     ctx?.clearRect(0,0, canvas.width, canvas.height)
        // }
        // cancelAnimationFrame(animation)
    }
}

const playAudio = () => {
    var audio: HTMLElement | null = document.getElementById("myAudio")
    if (audio instanceof HTMLAudioElement) {
        audio?.play()
    }
}

export default initCanvas