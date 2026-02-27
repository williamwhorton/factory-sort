import { Scene } from 'phaser'
import { ConveyorBelt } from '../objects/ConveyorBelt'
import { ConveyorItem, ItemColor, ItemShape } from '../objects/ConveyorItem'
import { DestinationBin } from '../objects/DestinationBin'

export class Game extends Scene {
  private belt: ConveyorBelt
  private bins: DestinationBin[] = []
  private scoreText: Phaser.GameObjects.Text
  private spawnTimer: number = 0
  private spawnInterval: number = 1500 // 1.5 seconds

  constructor() {
    super('Game')
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xf0f0f0) // Lighter background for minimalist look

    // Center the belt
    this.belt = new ConveyorBelt(this, 50, 300, 924)

    // Setup Bins
    const colors = [ItemColor.RED, ItemColor.BLUE, ItemColor.GREEN, ItemColor.YELLOW]
    colors.forEach((color, index) => {
      const bin = new DestinationBin(this, 200 + index * 200, 500, color)
      this.bins.push(bin)
    })

    this.scoreText = this.add
      .text(512, 50, 'Score: 0', {
        fontFamily: 'Arial Black',
        fontSize: 32,
        color: '#333333',
        align: 'center',
      })
      .setOrigin(0.5)

    this.add
      .text(512, 100, 'Tap an item to sort it!', {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#666666',
        align: 'center',
      })
      .setOrigin(0.5)
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

    item.on('sort', (item: ConveyorItem) => {
      this.handleSort(item)
    })

    this.belt.addItem(item)
  }

  private handleSort(item: ConveyorItem): void {
    // Find matching bin
    const matchingBin = this.bins.find((bin) => bin.binColor === item.itemColor)

    if (matchingBin) {
      // Animate item to bin
      this.tweens.add({
        targets: item,
        x: matchingBin.x - this.belt.x, // Adjust for container coordinate system
        y: matchingBin.y - this.belt.y,
        scale: 0.5,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          matchingBin.acceptItem(item)
          this.updateScore()
          item.destroy()
          // Remove from belt's internal list
          const items = this.belt.getItems()
          const index = items.indexOf(item)
          if (index > -1) {
            items.splice(index, 1)
          }
        },
      })
    }
  }

  private updateScore(): void {
    const totalScore = this.bins.reduce((sum, bin) => sum + bin.getScore(), 0)
    this.scoreText.setText(`Score: ${totalScore}`)
  }
}
