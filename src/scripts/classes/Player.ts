class Player {
  private x: number
  private y: number
  private width: number
  private height: number
  private personImage = new Image()

  constructor() {
    this.x = 50
    this.y = 75
    this.width = 65
    this.height = 75

    this.personImage.src = '/images/chrome-dino-run/enter.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      // ctx.fillStyle = 'green'
      // ctx?.fillRect(this.x, this.y, this.width, this.height)
      ctx.drawImage(this.personImage, this.x, this.y, this.width, this.height)
    }
  }

  jump() { this.y -= 2.5 }
  fall() { this.y += 2.5 }

  getContactPoints(): number[] {
    return [
      this.x,
      this.x + this.width,
      this.y,
      this.y + this.height
    ]
  }
}

export default Player