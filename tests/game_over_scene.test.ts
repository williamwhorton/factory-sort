import { GameOver } from '../src/game/scenes/game_over'

describe('GameOver Scene', () => {
  let scene: GameOver

  beforeEach(() => {
    scene = new GameOver()
    scene.cameras = {
      main: {
        setBackgroundColor: jest.fn(),
      } as unknown as Phaser.Cameras.Scene2D.Camera,
    } as unknown as Phaser.Cameras.Scene2D.CameraManager
    scene.add = {
      text: jest.fn().mockReturnValue({
        setOrigin: jest.fn().mockReturnThis(),
      }),
    } as unknown as Phaser.GameObjects.GameObjectFactory
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.input = {
      once: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scene = {
      start: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scale = {
      width: 1024,
      height: 768,
    }
  })

  it('should be named GameOver', () => {
    expect(scene.sys.settings.key).toBe('GameOver')
  })

  it('should show Victory message on win', () => {
    scene.create({ score: 100, win: true })
    expect(scene.cameras.main.setBackgroundColor).toHaveBeenCalledWith(0x228b22)
    expect(scene.add.text).toHaveBeenCalledWith(512, 768 * 0.4, 'Victory!', expect.any(Object))
    expect(scene.add.text).toHaveBeenCalledWith(
      512,
      768 * 0.55,
      'Final Score: 100',
      expect.any(Object)
    )
  })

  it('should show Game Over message on loss', () => {
    scene.create({ score: 50, win: false })
    expect(scene.cameras.main.setBackgroundColor).toHaveBeenCalledWith(0xff0000)
    expect(scene.add.text).toHaveBeenCalledWith(512, 768 * 0.4, 'Game Over', expect.any(Object))
  })

  it('should return to MainMenu on click', () => {
    scene.create({ score: 0, win: true })
    const callback = (scene.input.once as jest.Mock).mock.calls[0][1]
    callback()
    expect(scene.scene.start).toHaveBeenCalledWith('MainMenu')
  })
})
