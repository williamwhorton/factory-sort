import { Scene } from 'phaser'
import { ConveyorBelt } from '../objects/ConveyorBelt'
import { ConveyorItem, ItemColor, ItemShape } from '../objects/ConveyorItem'

export class Game extends Scene {
  private belt: ConveyorBelt
  private spawnTimer: number = 0
  private spawnInterval: number = 1500 // 1.5 seconds

  constructor() {
    super('Game')
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x028af8)

    this.add.image(512, 384, 'background').setAlpha(0.5)

    // Center the belt
    this.belt = new ConveyorBelt(this, 100, 384, 824)

    this.add
      .text(512, 100, 'Tap an item to sort it!\n(Implementation In Progress)', {
        fontFamily: 'Arial Black',
        fontSize: 24,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
      })
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      // Placeholder for scene transition if needed later
      // For now, let's keep the game running
    })
  }

  update(time: number, delta: number): void {
    this.spawnTimer += delta
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnItem()
      this.spawnTimer = 0
    }

    this.belt.updateItems()
  }

  private spawnItem(): void {
    const colors = [ItemColor.RED, ItemColor.BLUE, ItemColor.GREEN, ItemColor.YELLOW]
    const shapes = [ItemShape.CUBE, ItemShape.SPHERE, ItemShape.PYRAMID]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

    const item = new ConveyorItem(this, 0, 0, randomColor, randomShape)
    this.belt.addItem(item)
  }
}
