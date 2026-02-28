import { Scene } from 'phaser'
import { ConveyorBelt } from '../objects/conveyor_belt'
import { ConveyorItem, ItemColor, ItemShape } from '../objects/conveyor_item'
import { DestinationBin } from '../objects/destination_bin'
import { LevelManager, LevelStatus, LevelConfig } from '../level_manager'

export class Game extends Scene {
  private belt!: ConveyorBelt
  private bins: DestinationBin[] = []
  private scoreText!: Phaser.GameObjects.Text
  private timerText!: Phaser.GameObjects.Text
  private goalText!: Phaser.GameObjects.Text
  private levelText!: Phaser.GameObjects.Text
  private spawnTimer: number = 0
  private currentScore: number = 0
  private levelManager: LevelManager
  private currentLevel!: LevelConfig
  private timeLeft!: number
  private gameStatus: LevelStatus = LevelStatus.IN_PROGRESS

  constructor() {
    super('Game')
    this.levelManager = new LevelManager()
  }

  init(data: { levelIndex?: number }): void {
    if (data && data.levelIndex !== undefined) {
      this.levelManager = new LevelManager(data.levelIndex - 1)
    }
    this.currentLevel = this.levelManager.getCurrentLevel()
    this.timeLeft = this.currentLevel.timeLimit
    this.currentScore = 0
    this.gameStatus = LevelStatus.IN_PROGRESS
    this.bins = []
  }

  create(): void {
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor(0xf0f0f0)

    // Center the belt
    const beltWidth = width * 0.9
    this.belt = new ConveyorBelt(
      this,
      (width - beltWidth) / 2,
      height * 0.4,
      beltWidth,
      60,
      this.currentLevel.beltSpeed
    )

    // Setup Bins
    const colors = [ItemColor.RED, ItemColor.BLUE, ItemColor.GREEN, ItemColor.YELLOW]
    const binSpacing = width / (colors.length + 1)
    colors.forEach((color, index) => {
      const bin = new DestinationBin(this, binSpacing * (index + 1), height * 0.7, color)
      this.bins.push(bin)
    })

    this.scoreText = this.add
      .text(width / 2, 50, `Score: 0 / ${this.currentLevel.targetScore}`, {
        fontFamily: 'Arial Black',
        fontSize: 32,
        color: '#333333',
        align: 'center',
      })
      .setOrigin(0.5)

    this.timerText = this.add
      .text(width - 50, 50, `Time: ${this.timeLeft}`, {
        fontFamily: 'Arial Black',
        fontSize: 24,
        color: '#333333',
      })
      .setOrigin(1, 0.5)

    this.levelText = this.add
      .text(50, 50, `Level: ${this.levelManager.getLevelIndex()}`, {
        fontFamily: 'Arial Black',
        fontSize: 24,
        color: '#333333',
      })
      .setOrigin(0, 0.5)

    this.add
      .text(width / 2, 100, 'Tap an item to sort it!', {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#666666',
        align: 'center',
      })
      .setOrigin(0.5)

    // Timer event
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.gameStatus === LevelStatus.IN_PROGRESS) {
          this.timeLeft--
          this.timerText.setText(`Time: ${this.timeLeft}`)
          if (this.timeLeft <= 0) {
            this.checkLevelStatus()
          }
        }
      },
      callbackScope: this,
      loop: true,
    })
  }

  update(time: number, delta: number): void {
    if (this.gameStatus !== LevelStatus.IN_PROGRESS) return

    this.spawnTimer += delta
    if (this.spawnTimer >= this.currentLevel.spawnInterval) {
      this.spawnItem()
      this.spawnTimer = 0
    }

    this.belt.updateItems()
  }

  private spawnItem(): void {
    const colors = this.currentLevel.allowedColors
    const shapes = [ItemShape.CUBE, ItemShape.SPHERE, ItemShape.PYRAMID]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

    const item = new ConveyorItem(this, 0, 0, randomColor, randomShape)

    item.on('pointerdown', () => {
      if (this.gameStatus === LevelStatus.IN_PROGRESS) {
        this.handleSort(item)
      }
    })

    this.belt.addItem(item)
  }

  private handleSort(item: ConveyorItem): void {
    // Calculate global position of the item
    const itemWorldX = this.belt.x + item.x
    const itemWorldY = this.belt.y + item.y

    // Find the nearest bin
    let nearestBin: DestinationBin | null = null
    let minDistance = Infinity

    this.bins.forEach((bin) => {
      const distance = Phaser.Math.Distance.Between(itemWorldX, itemWorldY, bin.x, bin.y)
      if (distance < minDistance) {
        minDistance = distance
        nearestBin = bin
      }
    })

    if (nearestBin && (nearestBin as DestinationBin).binColor === item.itemColor) {
      if (this.sound.get('sort_correct')) {
        this.sound.play('sort_correct')
      }
      // Add a little juice: small scale up before moving
      const targetBin = nearestBin as DestinationBin
      this.tweens.add({
        targets: item,
        scale: 1.2,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          // Animate item to bin
          this.tweens.add({
            targets: item,
            x: targetBin.x - this.belt.x, // Adjust for container coordinate system
            y: targetBin.y - this.belt.y,
            scale: 0.2,
            alpha: 0,
            rotation: Math.PI,
            duration: 400,
            ease: 'Back.easeIn',
            onComplete: () => {
              targetBin.acceptItem(item)
              this.currentScore++
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
        },
      })
    } else {
      if (this.sound.get('sort_wrong')) {
        this.sound.play('sort_wrong')
      }
      // If mismatched, we still want some visual feedback and score decrement
      this.currentScore = Math.max(0, this.currentScore - 1)
      this.scoreText.setText(`Score: ${this.currentScore} / ${this.currentLevel.targetScore}`)

      this.tweens.add({
        targets: item,
        x: item.x - 10,
        duration: 50,
        yoyo: true,
        repeat: 2,
      })
    }
  }

  private updateScore(): void {
    this.scoreText.setText(`Score: ${this.currentScore} / ${this.currentLevel.targetScore}`)

    if (this.currentScore >= this.currentLevel.targetScore) {
      this.gameStatus = LevelStatus.SUCCESS
      this.handleLevelComplete()
    }
  }

  private checkLevelStatus(): void {
    if (this.currentScore >= this.currentLevel.targetScore) {
      this.gameStatus = LevelStatus.SUCCESS
      this.handleLevelComplete()
    } else {
      this.gameStatus = LevelStatus.FAILURE
      this.handleLevelFailed()
    }
  }

  private handleLevelComplete(): void {
    const { width, height } = this.scale
    const message = this.levelManager.isLastLevel() ? 'Game Complete!' : 'Level Complete!'

    this.add
      .text(width / 2, height / 2, message, {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#228B22',
        stroke: '#ffffff',
        strokeThickness: 8,
      })
      .setOrigin(0.5)

    this.time.delayedCall(2000, () => {
      if (this.levelManager.nextLevel()) {
        this.scene.restart({ levelIndex: this.levelManager.getLevelIndex() })
      } else {
        this.scene.start('GameOver', { score: this.currentScore, win: true })
      }
    })
  }

  private handleLevelFailed(): void {
    const { width, height } = this.scale
    this.add
      .text(width / 2, height / 2, 'Level Failed!', {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#ff0000',
        stroke: '#ffffff',
        strokeThickness: 8,
      })
      .setOrigin(0.5)

    this.time.delayedCall(2000, () => {
      this.scene.start('GameOver', { score: this.currentScore, win: false })
    })
  }
}
