import { Scene } from 'phaser'

export class GameOver extends Scene {
  constructor() {
    super('GameOver')
  }

  create(data: { score: number; win: boolean }): void {
    const bgColor = data.win ? 0x228b22 : 0xff0000
    this.cameras.main.setBackgroundColor(bgColor)

    const message = data.win ? 'Victory!' : 'Game Over'

    this.add
      .text(512, 384, message, {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)

    this.add
      .text(512, 480, `Final Score: ${data.score || 0}`, {
        fontFamily: 'Arial Black',
        fontSize: 32,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
        align: 'center',
      })
      .setOrigin(0.5)

    this.add
      .text(512, 600, 'Click to return to Main Menu', {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }
}
