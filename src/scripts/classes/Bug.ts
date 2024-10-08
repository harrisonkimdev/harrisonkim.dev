class Bug {
  private x: number
  private y: number
  private width: number
  private height: number
  private bugImage = new Image()

  constructor() {
    this.x = window.innerWidth
    this.y = 125
    this.width = 25
    this.height = 25

    this.bugImage.src = '/images/bug.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx?.drawImage(
      this.bugImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  moveForward() {
    this.x -= 3 + Math.floor(Math.random()*1)
  }

  isOutOfFrame(): boolean {
    return this.x < 0 ? true : false
  }

  getContactPoints(): number[] {
    return [
      this.x,
      this.x + this.width,
      this.y,
      this.y + this.height
    ]
  }
}

export default Bug