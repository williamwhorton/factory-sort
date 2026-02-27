import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init(): void {
    const { width, height } = this.scale
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(width / 2, height / 2, 'background')

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(width / 2, height / 2, 468, 32).setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(width / 2 - 230, height / 2, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload(): void {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets')

    this.load.image('logo', 'logo.png')

    // Audio placeholders (assuming they might be added to assets folder)
    // For now, we will use a synth or simple sound generation if possible,
    // but typically we load files.
    // this.load.audio('sort_correct', 'sort_correct.mp3');
    // this.load.audio('sort_wrong', 'sort_wrong.mp3');
  }

  create(): void {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu')
  }
}
