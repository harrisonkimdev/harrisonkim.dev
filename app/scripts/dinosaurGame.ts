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

    var animation: number;
    var timer = 0
    var score = 0
    var bugs: Bug[] = []
    var numbers: Number[] = []
    var isJumping = false

    class Player {
        private x: number
        private y: number
        private width: number
        private height: number

        constructor() {
            this.x = 50
            this.y = 75
            this.width = 65
            this.height = 75
        }
        draw() {
            if (ctx) {
                ctx.fillStyle = 'green'
                ctx?.fillRect(this.x, this.y, this.width, this.height)
                ctx.drawImage(personImage, this.x, this.y, this.width, this.height)
            }
        }
        jump() {
            this.y -= 3

            // setTimeout(() => {
            //     dinoY += 100;
            // }, 300);
        }
        fall() {
            this.y += 3
        }
        isOnTheGround(): boolean {
            return this.y === 75 ? true : false
        }
        didHitTheCeiling(): boolean {
            return this.y === 0 ? true : false
        }
        getContactPoints(): number[] {
            return [this.x, this.x + this. width, this.y, this.y + this.height]
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
        isOutOfFrame(): boolean {
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
        isOutOfFrame(): boolean {
            return this.x < 0 ? true : false
        }
        getContactPoints(): number[] {
            return [this.x, this.x + this. width, this.y, this.y + this.height]
        }
    }

    var player = new Player()

    const initAnimation = () => {
        animation = requestAnimationFrame(initAnimation)
        
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
        player.draw()

        // bugs
        bugs.forEach((bug, i, o) => {
            if (bug.isOutOfFrame())
                o.splice(i, 1)
            bug.moveForward()
            bug.draw()

            checkCollision(player.getContactPoints(), bug.getContactPoints())
        })

        // numbers
        numbers.forEach((number, i, o) => {
            if (number.isOutOfFrame())
                o.splice(i, 1)
            number.moveForward()
            number.draw()
        })

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

const playAudio = () => {
    var audio: HTMLElement | null = document.getElementById("myAudio")
    if (audio instanceof HTMLAudioElement) {
        audio?.play()
    }
}

export default initCanvas