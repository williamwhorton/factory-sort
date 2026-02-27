import { AUTO, Game } from 'phaser'
import { Boot } from './scenes/Boot'
import { Game as MainGame } from './scenes/game'
import { GameOver } from './scenes/game_over'
import { MainMenu } from './scenes/main_menu'
import { Preloader } from './scenes/preloader'

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
}

const StartGame = (parent: string) => {
  const game = new Game({ ...config, parent })
  if (typeof window !== 'undefined') {
    ;(window as { game?: Game }).game = game
  }
  return game
}

export default StartGame
