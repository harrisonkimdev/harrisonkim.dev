class BackgroundNumber {
  private x: number
  private y: number
  private width: number
  private height: number
  private numberImage = new Image()

  constructor() {
    this.x = window.innerWidth
    this.y = Math.floor(Math.random() * 75)
    this.width = 10
    this.height = 15

    var zeroOrOne = Math.floor(Math.random() * 2)

    if (zeroOrOne === 0) this.numberImage.src = '/images/chrome-dino-run/zero.png'
    else this.numberImage.src = '/images/chrome-dino-run/one.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx?.drawImage(
      this.numberImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  moveForward() {
    this.x -= (3 + Math.floor(Math.random()*5))
  }
  
  isOutOfFrame(): boolean {
    return this.x < 0 ? true : false
  }
}

export default BackgroundNumber