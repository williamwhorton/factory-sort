import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload(): void {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.image('background', 'assets/bg.png')
  }

  create(): void {
    const { width, height } = this.scale
    this.add.image(width / 2, height / 2, 'background')
    this.scene.start('Preloader')
  }
}
