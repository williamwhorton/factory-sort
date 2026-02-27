import { GameObjects, Scene } from 'phaser'
import { ConveyorItem, ItemColor } from './conveyor_item'

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
    const cornerRadius = 10
    this.graphic.clear()

    // Outer shell - rounded and softer
    this.graphic.lineStyle(2, 0xadb5bd, 1)
    this.graphic.strokeRoundedRect(
      -this.binWidth / 2,
      -this.binHeight / 2,
      this.binWidth,
      this.binHeight,
      cornerRadius
    )

    // Interior background
    this.graphic.fillStyle(0xf8f9fa, 1)
    this.graphic.fillRoundedRect(
      -this.binWidth / 2,
      -this.binHeight / 2,
      this.binWidth,
      this.binHeight,
      cornerRadius
    )

    // Interior color indicator (bottom strip)
    this.graphic.fillStyle(this.binColor, 1)
    this.graphic.fillRoundedRect(
      -this.binWidth / 2 + 10,
      this.binHeight / 2 - 15,
      this.binWidth - 20,
      10,
      4
    )
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
