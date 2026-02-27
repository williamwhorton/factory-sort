import { GameObjects, Scene } from 'phaser'
import { ConveyorItem } from './conveyor_item'

export class ConveyorBelt extends GameObjects.Container {
  private items: ConveyorItem[] = []
  private beltGraphics: GameObjects.Graphics
  private path: Phaser.Curves.Path
  private beltWidth: number
  private beltSpeed: number = 2

  constructor(
    scene: Scene,
    x: number,
    y: number,
    length: number,
    width: number = 60,
    speed: number = 2
  ) {
    super(scene, x, y)

    this.beltWidth = width
    this.beltSpeed = speed
    this.path = new Phaser.Curves.Path(0, 0)
    this.path.lineTo(length, 0)

    this.beltGraphics = scene.add.graphics()
    this.drawBelt(length)
    this.add(this.beltGraphics)

    scene.add.existing(this)
  }

  private drawBelt(length: number): void {
    this.beltGraphics.clear()
    // Background of the belt
    this.beltGraphics.fillStyle(0x333333, 1)
    this.beltGraphics.fillRect(0, -this.beltWidth / 2, length, this.beltWidth)

    // Border
    this.beltGraphics.lineStyle(4, 0x1a1a1a, 1)
    this.beltGraphics.strokeRect(0, -this.beltWidth / 2, length, this.beltWidth)

    // Simple belt marks
    this.beltGraphics.lineStyle(2, 0x444444, 1)
    for (let i = 0; i < length; i += 40) {
      this.beltGraphics.lineBetween(i, -this.beltWidth / 2, i, this.beltWidth / 2)
    }
  }

  public addItem(item: ConveyorItem): void {
    this.items.push(item)
    this.add(item)
    // Position relative to container
    item.setPosition(0, 0)
  }

  public updateItems(): void {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i]
      item.x += this.beltSpeed

      // Remove item if it falls off the belt (end of length)
      // length is stored implicitly in the path
      const endX = (this.path.getEndPoint() as Phaser.Math.Vector2).x
      if (item.x > endX) {
        this.items.splice(i, 1)
        item.destroy()
      }
    }
  }

  public getItems(): ConveyorItem[] {
    return this.items
  }
}
