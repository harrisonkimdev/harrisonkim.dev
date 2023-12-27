var bugImage = new Image()
bugImage.src = '/images/bug.png'

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
    draw(ctx: CanvasRenderingContext2D) {
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

export default Bug