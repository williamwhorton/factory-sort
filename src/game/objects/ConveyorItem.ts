import { GameObjects, Scene } from 'phaser'

export enum ItemColor {
  RED = 0xff4d4d,
  BLUE = 0x4d79ff,
  GREEN = 0x4dff88,
  YELLOW = 0xffff4d,
}

export enum ItemShape {
  CUBE,
  SPHERE,
  PYRAMID,
}

export class ConveyorItem extends GameObjects.Container {
  public itemColor: ItemColor
  public itemShape: ItemShape
  private graphic: GameObjects.Graphics

  constructor(scene: Scene, x: number, y: number, color: ItemColor, shape: ItemShape) {
    super(scene, x, y)

    this.itemColor = color
    this.itemShape = shape

    this.graphic = scene.add.graphics()
    this.drawShape()
    this.add(this.graphic)

    scene.add.existing(this)
  }

  private drawShape(): void {
    const size = 30
    this.graphic.clear()
    this.graphic.fillStyle(this.itemColor, 1)
    this.graphic.lineStyle(2, 0xffffff, 1)

    switch (this.itemShape) {
      case ItemShape.CUBE:
        this.graphic.fillRect(-size / 2, -size / 2, size, size)
        this.graphic.strokeRect(-size / 2, -size / 2, size, size)
        break
      case ItemShape.SPHERE:
        this.graphic.fillCircle(0, 0, size / 2)
        this.graphic.strokeCircle(0, 0, size / 2)
        break
      case ItemShape.PYRAMID:
        this.graphic.fillTriangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2)
        this.graphic.strokeTriangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2)
        break
    }
  }
}
