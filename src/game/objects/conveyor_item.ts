import { GameObjects, Scene } from 'phaser'

export enum ItemColor {
  RED = 0xff6b6b,
  BLUE = 0x4dabf7,
  GREEN = 0x51cf66,
  YELLOW = 0xffd43b,
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

    // Make interactive
    const size = 30
    this.setSize(size, size)
    this.setInteractive(
      new Phaser.Geom.Rectangle(-size / 2, -size / 2, size, size),
      Phaser.Geom.Rectangle.Contains
    )
    this.on('pointerdown', () => {
      this.emit('sort', this)
    })

    scene.add.existing(this)
  }

  private drawShape(): void {
    const size = 30
    const cornerRadius = 6
    this.graphic.clear()
    this.graphic.fillStyle(this.itemColor, 1)

    switch (this.itemShape) {
      case ItemShape.CUBE:
        this.graphic.fillRoundedRect(-size / 2, -size / 2, size, size, cornerRadius)
        break
      case ItemShape.SPHERE:
        this.graphic.fillCircle(0, 0, size / 2)
        break
      case ItemShape.PYRAMID:
        // Softened triangle using a custom shape or just fillTriangle for now
        // To keep it simple and minimalist, let's use fillTriangle but maybe slightly smaller to feel "softer"
        this.graphic.fillTriangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2)
        break
    }
  }
}
