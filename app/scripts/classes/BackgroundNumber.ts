class BackgroundNumber {
    private x: number
    private y: number
    private width: number
    private height: number
    private zeroImage = new Image()
    private oneImage = new Image()

    constructor() {
        this.x = window.innerWidth
        this.y = Math.floor(Math.random() * 75)
        this.width = 25
        this.height = 25

        this.zeroImage.src = '/images/zero.png'
        this.oneImage.src = '/images/one.png'
    }
    draw(ctx: CanvasRenderingContext2D) {
        var zeroOrOne = Math.floor(Math.random() * 2)

        if (ctx) {
            ctx.fillStyle = 'yellow'
            ctx?.fillRect(this.x, this.y, this.width, this.height)
            if (zeroOrOne === 0)
                ctx?.drawImage(this.zeroImage, this.x, this.y, this.width, this.height)
            else
                ctx?.drawImage(this.oneImage, this.x, this.y, this.width, this.height)
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