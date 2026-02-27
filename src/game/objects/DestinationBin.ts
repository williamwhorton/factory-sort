import { GameObjects, Scene } from 'phaser'
import { ConveyorItem, ItemColor } from './ConveyorItem'

export class DestinationBin extends GameObjects.Container {
  public binColor: ItemColor
  private graphic: GameObjects.Graphics
  private score: number = 0
  private binWidth: number = 80
  private binHeight: number = 80

  constructor(scene: Scene, x: number, y: number, color: ItemColor) {
    super(scene, x, y)

    this.binColor = color
    this.graphic = scene.add.graphics()
    this.drawBin()
    this.add(this.graphic)

    scene.add.existing(this)
  }

  private drawBin(): void {
    this.graphic.clear()

    // Outer shell
    this.graphic.lineStyle(4, 0x333333, 1)
    this.graphic.strokeRect(-this.binWidth / 2, -this.binHeight / 2, this.binWidth, this.binHeight)

    // Interior color indicator (bottom strip)
    this.graphic.fillStyle(this.binColor, 1)
    this.graphic.fillRect(-this.binWidth / 2 + 5, this.binHeight / 2 - 15, this.binWidth - 10, 10)

    // Side walls
    this.graphic.fillStyle(0xcccccc, 1)
    this.graphic.fillRect(-this.binWidth / 2, -this.binHeight / 2, 5, this.binHeight)
    this.graphic.fillRect(this.binWidth / 2 - 5, -this.binHeight / 2, 5, this.binHeight)
    this.graphic.fillRect(-this.binWidth / 2, this.binHeight / 2 - 5, this.binWidth, 5)
  }

  public acceptItem(item: ConveyorItem): boolean {
    if (item.itemColor === this.binColor) {
      this.score++
      // Visual feedback could be added here later
      return true
    }
    return false
  }

  public getScore(): number {
    return this.score
  }
}
