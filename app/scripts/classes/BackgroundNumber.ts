var zeroImage = new Image()
zeroImage.src = '/images/zero.png'
var oneImage = new Image()
oneImage.src = '/images/one.png'

class BackgroundNumber {
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
    draw(ctx: CanvasRenderingContext2D) {
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

export default BackgroundNumber